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

	$: statNumberOfContributions = jobsByContributionURL.size;
	$: statNumberOfJobs = jobsWithPrediction.length;
	$: statApprovedContributions = latestJobsForContribution.filter(
		(j) => j.contribution.predicted_outcome.prediction === 'approved'
	).length;
	$: statAvgTimeToMerge = 12;
	$: statMeanTimeToMerge = 12;
	$: statTimeSaved = 12;
</script>

<div>
	<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">PRs</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statNumberOfContributions}</span><span />
		</div>
	</div>

	<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">Codeball Jobs</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statNumberOfJobs}</span><span />
		</div>
	</div>

	<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">Approvals</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statApprovedContributions}</span><span />
		</div>
	</div>

	<!--
	<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">avg Lead Time</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statAvgTimeToMerge}</span><span>m</span>
		</div>
	</div>

	<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">mean Lead Time</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statMeanTimeToMerge}</span><span>m</span>
		</div>
	</div>

	<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">Time Saved</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statTimeSaved}</span><span>m</span>
		</div>
	</div>-->
</div>
