<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Dashboard'
		}
	});
</script>

<script lang="ts">
	import { type Job, list } from '$lib/jobs';
	import { onMount } from 'svelte';
	import { Jobs, Stats } from '$lib/components/dashboard';
	import Spinner from '$lib/Spinner.svelte';
	import { GitHubLoginButton } from '$lib/components/index';
	import OrganisationPicker from '../lib/components/dashboard/OrganisationPicker.svelte';

	let jobs: Job[] = [];
	let loaded = false;
	let loading = false;

	const loadJobs = async () => {
		let cursor = '';
		loading = true;
		for (let i = 0; i < 10; i++) {
			let stop = false;

			await list({ cursor })
				.then((data) => {
					jobs = jobs.concat(data.jobs);
					cursor = data.next;
					loaded = true;
					if (!data.jobs) {
						stop = true;
					}
				})
				.catch((err) => {
					loaded = true;
					stop = true;
					console.error(err);
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
	{:else if jobs.length > 0}
		<Stats {jobs} />
		<div class="flex space-x-2">
			<OrganisationPicker {jobs} />
			<div class="grow">
				<Jobs {jobs} />
			</div>
		</div>
	{:else}
		<div class="space-y-2 text-gray-600">
			<p>No jobs found (or access denied).</p>
			<GitHubLoginButton showText={true} />
		</div>
	{/if}
</div>
