<script lang="ts">
	import { type Job, listInOrganizationAndRepository } from '$lib/jobs';
	import { onMount } from 'svelte';
	import { Jobs, Stats } from '$lib/components/dashboard';
	import { page } from '$app/stores';

	let jobs: Job[] = [];

	const load = () => {
		listInOrganizationAndRepository($page.params.orgName, $page.params.repoName).then((data) => {
			jobs = data.jobs;
		});
	};
	onMount(load);
</script>

<div class="flex flex-col space-y-16 font-mono">
	{#if jobs.length > 0}
		<Stats {jobs} />
		<Jobs {jobs} />
	{/if}
</div>
