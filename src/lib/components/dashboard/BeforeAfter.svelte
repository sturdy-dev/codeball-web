<script lang="ts">
    import {type ContributionJob, type Job} from '$lib/jobs';

    export let jobs: Job[];

    const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
        array.reduce((map, value, index, array) => {
            const key = predicate(value, index, array);
            map.get(key)?.push(value) ?? map.set(key, [value]);
            return map;
        }, new Map<Q, T[]>());

    const jobSortTime = (j: Job): string => {
		return j?.contribution?.actual_outcome?.merged_at
        // return j?.contribution?.predicted_outcome?.predicted_at ||
          //  return j?.contribution?.actual_outcome?.merged_at ||
          //   j?.contribution?.actual_outcome?.closed_at ||
          //   j?.created_at ||
          //   "0"
    }


	const byJobCreatedAtAsc = (a: ContributionJob, b: ContributionJob) =>
			jobSortTime(a.created_at).localeCompare(b.created_at);

	const byPredictedAtDesc = (a: ContributionJob, b: ContributionJob) =>
			jobSortTime(a).localeCompare(jobSortTime(b));

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

    /*
    $: jobsWithPrediction = jobs.filter(
        (j) => j?.contribution?.predicted_outcome && j?.contribution?.actual_outcome?.merged_at
    ) as ContributionJob[];

    $: jobsByContributionURL = groupByToMap(
        jobsWithPrediction,
        (j: ContributionJob) => j.contribution.url
    );

    $: latestJobsForContribution = getLatestByURL(jobsByContributionURL).sort(byPredictedAtDesc);

    $: gitHubActionJobs = latestJobsForContribution.filter(
        (j: ContributionJob) => j.meta.user_agent === 'github-actions'
    );

    $: firstJobFromActions = gitHubActionJobs.sort(byPredictedAtAsc)[0];

    $: nonActionsJobsBeforeFirst = latestJobsForContribution.filter(
        (j: ContributionJob) => !firstJobFromActions || j.contribution.created_at < firstJobFromActions.contribution.created_at
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
    $: preCodeballNotApprovedAvgMergeTimeSeconds = avgTimeToMergeSeconds(preCodeballNotApproved);*/

	$: mergedJobs = jobs.filter(
		(j: ContributionJob) => j.contribution.actual_outcome?.merged_at);

	$: gitHubActionJobs = jobs.filter(
			(j: ContributionJob) => j.meta.user_agent === 'github-actions'
	);

	$: firstJobFromActions = gitHubActionJobs.sort(byJobCreatedAtAsc)[0];

    $: jobsByContributionURL = groupByToMap(
			mergedJobs,
        (j: ContributionJob) => j.contribution.url
    );

    $: latestJobsForContribution = getLatestByURL(jobsByContributionURL).sort(byPredictedAtDesc);

    const getWeekNumber = (d: Date) => {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to the nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to the nearest Thursday
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

	const getMonday =  (d: Date) : Date => {
		d = new Date(d);
		const day = d.getDay(),
				diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

    $: jobsByMergedAtWeek = groupByToMap(
        latestJobsForContribution,
        (j: ContributionJob) => {
            const date = new Date(jobSortTime(j))
			const monday = getMonday(date)
			return monday.toLocaleDateString()
        })

	/*
		data: [{
			x: new Date('2018-02-12').getTime(),
			y: 76
		  }, {
			x: new Date('2018-02-12').getTime(),
			y: 76
	  	}]
	 */

	const buildTimeToMergeSeries = (byWeek: Map<string, Job>) : [number] => {
		let res = [];
		for (const [formattedDate, jobs] of byWeek) {
			const avg = (avgTimeToMergeSeconds(jobs) / 60 / 60).toFixed(1);
			const date = new Date(jobSortTime(jobs[0]))
			const monday = getMonday(date)
			res.push({
				x: monday.getTime(),
				y: avg,
			});
		}
		return res;
	}

	$: seriesTimeToMerge = buildTimeToMergeSeries(jobsByMergedAtWeek);

	$: chartSeries = [
		{
			name: "Avg. Time to Merge (hours)",
			data: seriesTimeToMerge,
		},
	]

	const buildAddedCodeballAnnotation = (firstJob: Job | null ) => {
		if (!firstJob) {
			return null
		}

		return {

					// in a datetime series, the x value should be a timestamp, just like it is generated below
					x: new Date(firstJob.created_at).getTime(),
					strokeDashArray: 0,
					borderColor: "#775DD0",
					label: {
						borderColor: "#775DD0",
						style: {
							color: "#fff",
							background: "#775DD0"
						},
						text: "Added Codeball"
					}
				}
	}

	$: addedCodeballAnnotation = buildAddedCodeballAnnotation(firstJobFromActions);

	import { browser } from "$app/env";
	import {onMount} from "svelte";

	let chartEl;
	let chartInst;

	const renderChart = () => {
		if (browser && chartInst) {
			chartInst.updateSeries(chartSeries)
			chartInst.clearAnnotations()
			chartInst.addXaxisAnnotation(addedCodeballAnnotation)
		}
	}

	$: chartSeries, renderChart()

	onMount(async () => {
		let options = {
			chart: {
				type: "line",
				toolbar: {
					show: false,
				},
			},
			stroke: {
				curve: 'smooth',
			},
			series: chartSeries,
			xaxis: {
				type: 'datetime'
			},
			fill: {
				type: 'gradient'
			},
			annotations: {
				xaxis: [addedCodeballAnnotation]
			},
		};

		if (browser) {
			const apesCharts = await import("$lib/apexcharts/chart")
			chartInst = new apesCharts.default(chartEl, options)
			chartInst.render()
		}
	});
</script>

<div style="height: 100px" bind:this={chartEl} />

<pre>
	jobs.length: {jobs.length}
	mergedJobs.length: {mergedJobs.length}
	jobsByContributionURL.size: {jobsByContributionURL.size}
	latestJobsForContribution.length: {latestJobsForContribution.length}
	gitHubActionJobs.length: {gitHubActionJobs.length}

	firstJobFromActions: {JSON.stringify(firstJobFromActions, null, 2)}
	addedAnnotation: {JSON.stringify(addedCodeballAnnotation)}

	chartSeries: {JSON.stringify(chartSeries, null, '  ')}

    <!--

    {#if firstJobFromActions}
    FIRST JOB WITH ACTION AT: {firstJobFromActions.contribution.created_at}
    {:else}
    NO JOB WITH ACTION FOUND..
    {/if}

    WITH CODEBALL: {latestJobsForContribution.length}
    CODEBALL APPROVED: {actionsCodeballApprovedCount}
    HUMAN APPROVED AVG MERGE TIME: {actionsCodeballNotApprovedAvgMergeTimeSeconds.toFixed(0)}
    CODEBALL APPROVED AVG MERGE TIME: {actionsCodeballApprovedAvgMergeTimeSeconds.toFixed(0)}

    BEFORE CODEBALL: {nonActionsJobsBeforeFirst.length}
    CODEBALL APPROVED: {preCodeballApprovedCount}
    HUMAN APPROVED AVG MERGE TIME: {preCodeballNotApprovedAvgMergeTimeSeconds.toFixed(0)}
    CODEBALL APPROVED AVG MERGE TIME: {preCodeballApprovedAvgMergeTimeSeconds.toFixed(0)}--->
</pre>
