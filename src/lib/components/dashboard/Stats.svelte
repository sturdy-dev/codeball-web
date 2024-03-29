<script lang="ts">
	import { type ContributionJob, type Job } from '$lib/jobs';
	import Time from './Time.svelte';
	import Histogram from '$lib/components/dashboard/Histogram.svelte';

	export let jobs: Job[];

	const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
		array.reduce((map, value, index, array) => {
			const key = predicate(value, index, array);
			map.get(key)?.push(value) ?? map.set(key, [value]);
			return map;
		}, new Map<Q, T[]>());

	$: jobsWithPrediction =
		(jobs?.filter(
			(j) => j?.contribution?.predicted_outcome && j.meta.user_agent === 'github-actions'
		) as ContributionJob[]) || [];

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

	const secondsToMerge = (job: ContributionJob) => {
		const createdAt = new Date(job.contribution.created_at);
		const mergedAt = new Date(job.contribution.actual_outcome.merged_at);
		return (mergedAt.getTime() - createdAt.getTime()) / 1000;
	};

	const median = (arr) => {
		const mid = Math.floor(arr.length / 2),
			nums = [...arr].sort((a, b) => a - b);
		return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
	};

	$: latestJobsForContribution = getLatestByURL(jobsByContributionURL).sort(byPredictedAt);

	$: mergedContributionJobs = latestJobsForContribution.filter(
		(j: ContributionJob) => j.contribution.actual_outcome?.merged_at
	);
	$: mergedContributionJobsApprovedByCodeball = mergedContributionJobs.filter(
		(j: ContributionJob) => j.contribution.predicted_outcome.prediction === 'approved'
	);
	$: mergedContributionJobsRejectedByCodeball = mergedContributionJobs.filter(
		(j: ContributionJob) => j.contribution.predicted_outcome.prediction !== 'approved'
	);

	const avgTimeToMergeSeconds = (jobs: ContributionJob[]) => {
		return jobs.map(secondsToMerge).reduce((a, b) => a + b, 0) / jobs.length;
	};

	const medianTimeToMergeSeconds = (jobs: ContributionJob[]) => {
		return median(jobs.map(secondsToMerge));
	};

	$: timeToMergeAvgSeconds = avgTimeToMergeSeconds(mergedContributionJobs);
	$: timeToMergeApprovedByCodeballAvgSeconds = avgTimeToMergeSeconds(
		mergedContributionJobsApprovedByCodeball
	);
	$: timeToMergeRejectedByCodeballAvgSeconds = avgTimeToMergeSeconds(
		mergedContributionJobsRejectedByCodeball
	);

	$: timeToMergeMedianSeconds = medianTimeToMergeSeconds(mergedContributionJobs);
	$: timeToMergeApprovedByCodeballMedianSeconds = medianTimeToMergeSeconds(
		mergedContributionJobsApprovedByCodeball
	);
	$: timeToMergeRejectedByCodeballMedianSeconds = medianTimeToMergeSeconds(
		mergedContributionJobsRejectedByCodeball
	);

	$: statNumberOfContributions = jobsByContributionURL.size;
	$: statNumberOfJobs = jobsWithPrediction.length;
	$: statApprovedContributions = latestJobsForContribution.filter(
		(j) => j.contribution.predicted_outcome.prediction === 'approved'
	).length;
</script>

<div class="grid grid-cols-3 gap-2">
	<div
		class="row-start-1 row-end-3 inline-flex grow flex-col space-y-2 bg-gray-400 p-4 md:min-w-[12rem] lg:row-end-4"
	>
		<span class="text-center font-bold uppercase">PRs</span>
		<div class="space-x-1 text-center">
			<span class="text-2xl text-white md:text-6xl">{statNumberOfContributions}</span><span />
		</div>
	</div>

	<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">Avg. Lead Time</span>
		<div class="space-x-1 text-center">
			<Time seconds={timeToMergeAvgSeconds} />
		</div>
		<span class="text-center text-sm">All PRs</span>
	</div>

	<div class="inline-flex flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">Codeball</span>
		<div class="space-x-1 text-center">
			<span class="text-2xl text-white md:text-6xl">
				{mergedContributionJobsApprovedByCodeball.length}
			</span>
		</div>
		<span class="text-center text-sm">Approved</span>
	</div>

	<div class="inline-flex h-full flex-col space-y-2 bg-gray-400 p-4 md:min-w-[12rem]">
		<div class="space-x-1 text-center">
			<Time seconds={timeToMergeApprovedByCodeballAvgSeconds} />
		</div>
		<span class="text-center text-sm">When Approved by Codeball</span>
	</div>

	<div class="inline-flex h-full flex-col space-y-2 bg-gray-400 p-4">
		<div class="space-x-1 text-center">
			<span class="text-2xl text-white md:text-6xl">
				{mergedContributionJobsRejectedByCodeball.length}
			</span>
		</div>
		<span class="text-center text-sm">Not Approved</span>
	</div>

	<div class="col-start-2 col-end-4 hidden flex-col justify-center bg-gray-400 p-4 lg:inline-flex">
		<span class="text-center font-bold uppercase">Confidence Histogram</span>
		<Histogram {jobs} />
	</div>
</div>
