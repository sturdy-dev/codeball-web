<script lang="ts">
	import type { ContributionJob } from '$lib/jobs';
	import Spinner from '$lib/Spinner.svelte';
	export let job: ContributionJob;
</script>

<div class="flex justify-around">
	<div class="flex flex-col">
		<div class="inline-flex items-center text-2xl text-gray-700">
			<Spinner />
			{#if job.contribution.title}
				<span
					>chrunching the numbers for <a href={job.contribution.url}>{job.contribution.title}</a
					>...</span
				>
			{:else}
				<span>chrunching the numbers...</span>
			{/if}
		</div>
		<div class="text-center"><span>[this might take a while]</span></div>
	</div>
</div>
