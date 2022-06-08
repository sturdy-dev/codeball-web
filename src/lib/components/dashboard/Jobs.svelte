<script lang="ts">
	import { type ContributionJob, type Job } from '$lib/jobs';

	export let jobs: Job[];

	const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
		array.reduce((map, value, index, array) => {
			const key = predicate(value, index, array);
			map.get(key)?.push(value) ?? map.set(key, [value]);
			return map;
		}, new Map<Q, T[]>());

	$: jobsWithPrediction = jobs.filter(
		(j) => j?.contribution?.predicted_outcome as ContributionJob
	) as ContributionJob[];

	$: jobsByContributionURL = groupByToMap(
		jobsWithPrediction,
		(j: ContributionJob) => j.contribution.url
	);

	const byPredictedAt = (a: ContributionJob, b: ContributionJob) =>
		b.contribution.predicted_outcome.predicted_at.localeCompare(
			a.contribution.predicted_outcome.predicted_at
		);

	const getLatestByURL = (jobsMap: Map<string, ContributionJob[]>): ContributionJob[] => {
		let res = [];
		for (const [url, jobs] of jobsMap) {
			const first = jobs.sort(byPredictedAt)[0];
			res.push(first);
		}
		return res;
	};

	$: latestJobsForContribution = getLatestByURL(jobsByContributionURL).sort(byPredictedAt);

	$: showJobs = latestJobsForContribution;
</script>

<section class="flex flex-col divide-y divide-gray-900 bg-white">
	<div
		class="flex w-full items-center gap-6 bg-gray-900 p-3 text-center text-sm font-semibold text-white"
	>
		<span class="hidden grow sm:block"> PULL REQUEST </span>
	</div>

	{#each showJobs as job}
		{@const codeballApproved = job.contribution.predicted_outcome.prediction === 'approved'}
		{@const haveActualOutcome = !!job.contribution.actual_outcome}
		{@const isMerged = job.contribution.actual_outcome?.merged_at}
		{@const isClosed = job.contribution.actual_outcome?.closed_at}
		{@const isOpen = !job.contribution.actual_outcome}

		<div class="flex flex-col items-center gap-6 p-3 sm:flex-row">
			<div class="flex grow flex-col">
				<a class="overflow-hidden text-sm text-gray-900" href={job.contribution.url}>
					<code class="text-gray-500">#{job.contribution.number}</code>
					{job.contribution.title}
				</a>

				<span class="text-sm text-gray-500">{job.contribution.predicted_outcome.predicted_at}</span>
			</div>

			<div class="">
				<span
					class="block w-32 py-2 text-center text-xs font-semibold leading-5"
					class:bg-green-100={codeballApproved}
					class:text-green-800={codeballApproved}
				>
					{codeballApproved ? 'APPROVED' : 'NOT APPROVED'}
				</span>
			</div>

			<div>
				<span
					class="block w-32 py-2 text-center text-xs font-semibold leading-5"
					class:bg-purple-100={isMerged}
					class:text-purple-800={isMerged}
					class:bg-red-100={isClosed}
					class:text-red-800={isClosed}
					class:bg-green-100={isOpen}
					class:text-green-800={isOpen}
				>
					{#if isMerged}
						MERGED
					{:else if isClosed}
						CLOSED
					{:else}
						OPEN
					{/if}
				</span>
			</div>
		</div>
	{/each}
</section>
