<script lang="ts">
	import { type ContributionJob } from '$lib/jobs';

	export let jobs: ContributionJob[];

	$: jobsWithPrediction = jobs.filter(j => j.contribution.predicted_outcome);
	$: showJobs = jobsWithPrediction;
</script>

<section class="flex flex-col divide-y divide-gray-900 bg-white">
	<div
		class="flex w-full items-center gap-6 bg-gray-900 p-3 text-center text-sm font-semibold text-white"
	>
		<span class="hidden grow sm:block"> PULL REQUEST </span>
		<span class="hidden grow sm:block"> CODEBALL </span>
		<span class="hidden grow sm:block"> ACTUAL </span>
	</div>

	{#each showJobs as job}
		{@const codeballApproved = job.contribution.predicted_outcome.prediction === 'approved'}

		<div class="flex flex-col items-center gap-6 p-3 sm:flex-row">
			<a
				class="grow overflow-hidden text-sm text-gray-900"
				href={job.contribution.url}
			>
				<code class="text-gray-500">#{job.contribution.number}</code>
				{job.contribution.title}
			</a>

			<span
				class="block w-32 py-2 text-center text-xs font-semibold leading-5"
				class:bg-green-100={codeballApproved}
				class:text-green-800={codeballApproved}
			>
				{codeballApproved ? 'APPROVED' : 'NOT APPROVED'}
			</span>
		</div>
	{/each}
</section>
