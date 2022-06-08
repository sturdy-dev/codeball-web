<script lang="ts">
	import { type Job, listInOrganizationAndRepository } from '$lib/jobs';
	import { onMount } from 'svelte';
	import { Jobs, Stats } from '$lib/components/dashboard';
	import { page } from '$app/stores';
	import Spinner from '$lib/Spinner.svelte';
	import { GitHubLoginButton } from '$lib/components/index';

	let jobs: Job[] = [];
	let loaded = false;

	const load = () => {
		listInOrganizationAndRepository($page.params.orgName, $page.params.repoName).then((data) => {
			jobs = data.jobs;
			loaded = true;
		});
	};
	onMount(load);
</script>

<div class="flex flex-col space-y-16 font-mono">
	{#if !loaded}
		<div class="flex justify-around">
			<Spinner />
		</div>
	{:else if jobs.length > 0}
		<Stats {jobs} />
		<Jobs {jobs} />
	{:else}
		<div class="space-y-2 text-gray-600">
			<p>
				No jobs found for
				<span class="text-black">
					{$page.params.orgName}/{$page.params.repoName}
				</span> (or access denied).
			</p>
			<GitHubLoginButton showText={true} />
		</div>
	{/if}
</div>
