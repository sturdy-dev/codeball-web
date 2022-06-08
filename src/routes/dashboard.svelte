<script lang="ts">
	import { type Job, list } from '$lib/jobs';
	import { onMount } from 'svelte';
	import { Jobs, Stats } from '$lib/components/dashboard';

	let jobs: Job[] = [];

	const load = () => {
		list().then((data) => {
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
