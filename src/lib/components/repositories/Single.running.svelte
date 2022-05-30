<script lang="ts">
	import { isFinalStatus, type Job } from '$lib/jobs';
	import Spinner from '$lib/Spinner.svelte';

	export let job: Job;

	$: allContributions = job.repository?.contribution_jobs || [];
	$: completedContributions = allContributions.filter(({ status }) => isFinalStatus(status));
</script>

<div class="flex justify-around">
	<div class="flex flex-col">
		<div class="inline-flex items-center justify-around text-2xl text-gray-700">
			<Spinner />
			{#if job.repository?.name}
				<span>chrunching the numbers for {job.repository.name}...</span>
			{:else}
				<span>chrunching the numbers...</span>
			{/if}
		</div>
		<div class="text-center"><span>[this might take a while]</span></div>
		<div class="text-center">
			<br />
			Found {allContributions.length} PRs.<br />
			Tested {completedContributions.length} PRs.
			<br /><br />
		</div>
	</div>
</div>
