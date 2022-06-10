<script lang="ts">
	import { type ContributionJob, type Event, type Job } from '$lib/jobs';
	import { formatDistance } from 'date-fns';

	export let jobs: Job[];

	const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
		array.reduce((map, value, index, array) => {
			const key = predicate(value, index, array);
			map.get(key)?.push(value) ?? map.set(key, [value]);
			return map;
		}, new Map<Q, T[]>());

	$: jobsWithPrediction = jobs.filter(
		(j) => j?.contribution?.predicted_outcome && j?.contribution?.actual_outcome?.merged_at
	) as ContributionJob[];

	$: jobsByContributionURL = groupByToMap(
		jobsWithPrediction,
		(j: ContributionJob) => j.contribution.url
	);

	const byPredictedAtDesc = (a: ContributionJob, b: ContributionJob) =>
		b.contribution.predicted_outcome.predicted_at.localeCompare(
			a.contribution.predicted_outcome.predicted_at
		);

	const byPredictedAtAsc = (a: ContributionJob, b: ContributionJob) =>
		a.contribution.predicted_outcome.predicted_at.localeCompare(
			b.contribution.predicted_outcome.predicted_at
		);

	const byContributionCreatedAtDesc = (a: ContributionJob, b: ContributionJob) =>
		b.contribution.created_at.localeCompare(a.contribution.created_at);

	const byContributionCreatedAtAsc = (a: ContributionJob, b: ContributionJob) =>
		a.contribution.created_at.localeCompare(b.contribution.created_at);

	const getLatestByURL = (jobsMap: Map<string, ContributionJob[]>): ContributionJob[] => {
		let res = [];
		for (const [url, jobs] of jobsMap) {
			const first = jobs.sort(byPredictedAtDesc)[0];
			res.push(first);
		}
		return res;
	};

	const secondsToMerge = (job: ContributionJob) => {
		const createdAt = new Date(job.contribution.created_at);
		const mergedAt = new Date(job.contribution.actual_outcome.merged_at);
		return (mergedAt.getTime() - createdAt.getTime()) / 1000;
	};

	const avgTimeToMergeSeconds = (jobs: ContributionJob[]) => {
		return jobs.map(secondsToMerge).reduce((a, b) => a + b, 0) / jobs.length;
	};

	$: latestJobsForContribution = getLatestByURL(jobsByContributionURL).sort(byPredictedAtDesc);

	$: gitHubActionJobs = latestJobsForContribution.filter(
		(j: ContributionJob) => j.meta.user_agent === 'github-actions'
	);

	$: firstJobFromActions = gitHubActionJobs.sort(byPredictedAtAsc)[0];

	$: nonActionsJobsBeforeFirst = latestJobsForContribution.filter(
		(j: ContributionJob) => j.contribution.created_at < firstJobFromActions.contribution.created_at
	);

	$: actionsCodeballApproved = gitHubActionJobs.filter(
		(j: ContributionJob) => j.contribution.predicted_outcome.prediction === 'approved'
	);
	$: actionsCodeballNotApproved = gitHubActionJobs.filter(
		(j: ContributionJob) => j.contribution.predicted_outcome.prediction !== 'approved'
	);
	$: actionsCodeballApprovedCount = actionsCodeballApproved.length;
	$: actionsCodeballApprovedAvgMergeTimeSeconds = avgTimeToMergeSeconds(actionsCodeballApproved);
	$: actionsCodeballNotApprovedAvgMergeTimeSeconds = avgTimeToMergeSeconds(
		actionsCodeballNotApproved
	);

	$: preCodeballApproved = nonActionsJobsBeforeFirst.filter(
		(j: ContributionJob) => j.contribution.predicted_outcome.prediction === 'approved'
	);
	$: preCodeballNotApproved = nonActionsJobsBeforeFirst.filter(
		(j: ContributionJob) => j.contribution.predicted_outcome.prediction !== 'approved'
	);
	$: preCodeballApprovedCount = preCodeballApproved.length;
	$: preCodeballApprovedAvgMergeTimeSeconds = avgTimeToMergeSeconds(preCodeballApproved);
	$: preCodeballNotApprovedAvgMergeTimeSeconds = avgTimeToMergeSeconds(preCodeballNotApproved);
</script>

<pre>

	FIRST JOB WITH ACTION AT: {firstJobFromActions.contribution.created_at}

	WITH CODEBALL: {latestJobsForContribution.length}
	CODEBALL APPROVED: {actionsCodeballApprovedCount}
	HUMAN APPROVED AVG MERGE TIME: {actionsCodeballNotApprovedAvgMergeTimeSeconds.toFixed(0)}
	CODEBALL APPROVED AVG MERGE TIME: {actionsCodeballApprovedAvgMergeTimeSeconds.toFixed(0)}

	BEFORE CODEBALL: {nonActionsJobsBeforeFirst.length}
	CODEBALL APPROVED: {preCodeballApprovedCount}
	HUMAN APPROVED AVG MERGE TIME: {preCodeballNotApprovedAvgMergeTimeSeconds.toFixed(0)}
	CODEBALL APPROVED AVG MERGE TIME: {preCodeballApprovedAvgMergeTimeSeconds.toFixed(0)}
</pre>
