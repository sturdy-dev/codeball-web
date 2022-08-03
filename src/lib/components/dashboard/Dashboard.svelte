<script lang="ts">
	import type { Preference } from '$lib/preferences';
	import { type Job, list, type ListOptions } from '$lib/jobs';
	import { onMount } from 'svelte';
	import { All, Repository } from '$lib/components/dashboard';
	import Spinner from '$lib/Spinner.svelte';
	import { GitHubLoginButton } from '$lib/components/index';

	export let login: string | null = null;
	export let organization: string | null = null;
	export let repository: string | null = null;
	export let preference: Preference | null = null;

	let jobs: Job[] = [];
	let loaded = false;
	let error = false;

	const loadJobs = async () => {
		let cursor = undefined as string | undefined;
		for (let i = 0; i < 10; i++) {
			let stop = false;

			let opts: ListOptions = {
				onlyRootJobs: true
			};
			if (cursor) {
				opts.cursor = cursor;
			}
			if (organization) {
				opts.organization = organization;
			}
			if (repository) {
				opts.repository = repository;
			}

			await list(opts)
				.then((data) => {
					jobs = jobs.concat(data.jobs);
					cursor = data.next;
					loaded = true;
					error = false;
					if (!data.next) {
						stop = true;
					}
				})
				.catch((err) => {
					loaded = true;
					stop = true;
					error = true;
					console.error(err);
				});

			if (stop) {
				break;
			}
		}
	};

	onMount(loadJobs);
</script>

<div class="flex flex-col space-y-2 font-mono">
	{#if !login}
		<div class="mt-8 flex flex-col items-center space-y-2 text-gray-600">
			<p>You need to login to access this page</p>
			<GitHubLoginButton {login} />
		</div>
	{:else if !loaded}
		<div class="flex justify-around">
			<Spinner />
		</div>
	{:else if error}
		<div class="mt-8 flex flex-col items-center space-y-2 text-gray-600">
			<p>Something went wrong. Please come back in a bit!</p>
		</div>
	{:else if jobs.length > 0}
		{#if organization && repository && preference}
			<Repository {jobs} {organization} {repository} {preference} />
		{:else}
			<All {jobs} />
		{/if}
	{:else}
		<div class="mt-8 flex flex-col items-center space-y-2 text-gray-600">
			{#if organization && repository}
				<p>
					We couldn't find any Codeball activity for {organization}/{repository}. Is the Codeball
					app correctly installed?
				</p>
			{:else}
				<p>
					We couldn't find any Codeball activity for you (yet!). Install the Codeball app to get
					started.
				</p>
			{/if}
			<GitHubLoginButton {login} />
		</div>
	{/if}
</div>
