<script lang="ts">
	import { list } from '$lib/jobs';
	import type { Job } from '$lib/jobs';
	import { Jobs, Stats } from '$lib/components/dashboard';
	import { Subscribe } from '$lib/components/subscriptions';
	import { page } from '$app/stores';
	import { GitHubLoginButton } from '$lib/components/index';
	import { onMount } from 'svelte';
	import Spinner from '$lib/Spinner.svelte';

	const { organization, repository } = $page.params;

	let jobs: Job[] = [];
	let loaded = false;
	let loading = false;

	const loadJobs = async () => {
		let cursor = '';
		loading = true;
		for (let i = 0; i < 10; i++) {
			let stop = false;

			await list({ organization, repository, cursor }).then((data) => {
				jobs = jobs.concat(data.jobs);
				cursor = data.next ?? '';
				loaded = true;
				if (!data.next) {
					stop = true;
				}
			});

			if (stop) {
				break;
			}
		}

		loading = false;
	};

	onMount(loadJobs);
</script>

<div class="flex flex-col space-y-2 font-mono">
	{#if !loaded}
		<div class="flex justify-around">
			<Spinner />
		</div>
	{:else if jobs?.length > 0}
		{#if loading}
			<div class="flex justify-around">
				<Spinner />
			</div>
		{/if}

		<Subscribe {organization} />
		<Stats {jobs} />
		<!-- <BeforeAfter {jobs} /> -->
		<Jobs {jobs} />
	{:else}
		<div class="space-y-2 text-gray-600">
			<p>
				No jobs found for
				<span class="text-black">
					{$page.params.organization}/{$page.params.repository}
				</span> (or access denied).
			</p>
			<GitHubLoginButton showText={true} />
		</div>
	{/if}
</div>
