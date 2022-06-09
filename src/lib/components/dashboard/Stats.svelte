<script lang="ts">
	import { type ContributionJob, type Job } from '$lib/jobs';
	import Time from './Time.svelte';

	export let jobs: Job[];

	const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
		array.reduce((map, value, index, array) => {
			const key = predicate(value, index, array);
			map.get(key)?.push(value) ?? map.set(key, [value]);
			return map;
		}, new Map<Q, T[]>());

	$: jobsWithPrediction = jobs?.filter(
		(j) => j?.contribution?.predicted_outcome as ContributionJob
	) as ContributionJob[] || [];

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
		(j) => j.contribution.actual_outcome
	);
	$: mergedContributionJobsApprovedByCodeball = mergedContributionJobs.filter(
		(j) => j.contribution.predicted_outcome.prediction === 'approved'
	);
	$: mergedContributionJobsRejectedByCodeball = mergedContributionJobs.filter(
		(j) => j.contribution.predicted_outcome.prediction !== 'approved'
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

<div class="flex gap-2">
	<div class="inline-flex min-w-[12rem] grow flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">PRs</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statNumberOfContributions}</span><span />
		</div>
	</div>

	<div class="inline-flex min-w-[12rem] grow flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">Codeball Jobs</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statNumberOfJobs}</span><span />
		</div>
	</div>

	<div class="inline-flex min-w-[12rem] grow flex-col space-y-2 bg-gray-400 p-4">
		<span class="text-center font-bold uppercase">Approvals</span>
		<div class="space-x-1 text-center">
			<span class="text-6xl text-white">{statApprovedContributions}</span><span />
		</div>
	</div>

	<div class=" flex min-w-[12rem] grow flex-col gap-2">
		<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
			<span class="text-center font-bold uppercase">Avg. Lead Time</span>
			<div class="space-x-1 text-center">
				<Time seconds={timeToMergeAvgSeconds} />
			</div>
			<span class="text-center text-sm">Total</span>
		</div>

		<div class="inline-flex min-w-[12rem] flex-col space-y-2 bg-gray-400 p-4">
			<div class="space-x-1 text-center">
				<Time seconds={timeToMergeApprovedByCodeballAvgSeconds} />
			</div>
			<span class="text-center text-sm">With Codeball</span>
		</div>
	</div>

	<div class=" flex min-w-[12rem] grow flex-col gap-2">
		<div class="inline-flex flex-col space-y-2 bg-gray-400 p-4">
			<span class="text-center font-bold uppercase">Median Lead Time</span>
			<div class="space-x-1 text-center">
				<Time seconds={timeToMergeMedianSeconds} />
			</div>
			<span class="text-center text-sm">Total</span>
		</div>

		<div class="inline-flex flex-col space-y-2 bg-gray-400 p-4">
			<div class="space-x-1 text-center">
				<Time seconds={timeToMergeApprovedByCodeballMedianSeconds} />
			</div>
			<span class="text-center text-sm">With Codeball</span>
		</div>
	</div>

	<div class=" flex min-w-[12rem] grow flex-col gap-2">
		<div class="inline-flex flex-col space-y-2 bg-gray-400 p-4">
			<span class="text-center font-bold uppercase">Codeball</span>
			<div class="space-x-1 text-center">
				<span class="text-6xl text-white">{mergedContributionJobsApprovedByCodeball.length}</span>
			</div>
			<span class="text-center text-sm">Approved</span>
		</div>

		<div class="inline-flex  flex-col space-y-2 bg-gray-400 p-4">
			<div class="space-x-1 text-center">
				<span class="text-6xl text-white">{mergedContributionJobsRejectedByCodeball.length}</span>
			</div>
			<span class="text-center text-sm">Not Approved</span>
		</div>
	</div>
</div>
