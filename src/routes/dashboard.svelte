<script lang="ts">
	import { type Job, list } from '$lib/jobs';
	import { onMount } from 'svelte';
	import { Jobs } from '$lib/components/dashboard';

	let jobs: Job[] = [];

	const load = () => {
		list().then((data) => {
			jobs = data.jobs;
		});
	};
	onMount(load);
</script>

<div class="flex flex-col space-y-16 font-mono">
	<div>
		<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
			<span class="text-center font-bold uppercase">Time saved</span>
			<div class="space-x-1 text-center">
				<span class="text-6xl text-white">52</span><span>h</span>
			</div>
		</div>
	</div>

	{#if jobs.length > 0}
		<Jobs {jobs} />
	{/if}
</div>
