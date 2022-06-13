<script lang="ts">
    import {type ContributionJob, type Job} from '$lib/jobs';
    import Chart from './Chart.svelte';

    export let jobs: Job[];

    const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q): Map<Q, T[]> =>
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


    // const byJobCreatedAtAsc = (a: ContributionJob, b: ContributionJob) =>
    //
    //
    // 		jobSortTime(a.created_at).localeCompare(b.created_at);

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

    const median = (arr) => {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    const medianTimeToMergeSeconds = (jobs: ContributionJob[]) => {
        return median(jobs.map(secondsToMerge));
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

    $: firstJobFromActions = gitHubActionJobs.sort(byPredictedAtAsc)[0];

    $: jobsByContributionURL = groupByToMap(mergedJobs, (j: ContributionJob) => j.contribution.url);

    $: latestJobsForContribution = getLatestByURL(jobsByContributionURL).sort(byPredictedAtDesc);

    const getMonday = (d: Date): Date => {
        d = new Date(d);
        const day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    const groupByWeek = (jobs: ContributionJob[]): Map<string, ContributionJob> =>
        groupByToMap(
            jobs,
            (j: ContributionJob): string => {
                const date = new Date(jobSortTime(j))
                const monday = getMonday(date)
                return monday.toLocaleDateString()
            })

    $: jobsByMergedAtWeek = groupByToMap(
        latestJobsForContribution,
        (j: ContributionJob) => {
            const date = new Date(jobSortTime(j))
            const monday = getMonday(date)
            return monday.toLocaleDateString()
        })

    const buildTimeToMergeAvgSeries = (byWeek: Map<string, Job>): [number] => {
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

    const buildTimeToMergeMedianSeries = (byWeek: Map<string, Job>): [number] => {
        let res = [];
        for (const [formattedDate, jobs] of byWeek) {
            const avg = (medianTimeToMergeSeconds(jobs) / 60/60).toFixed(1);
            const date = new Date(jobSortTime(jobs[0]))
            const monday = getMonday(date)
            res.push({
                x: monday.getTime(),
                y: avg,
            });
        }
        return res;
    }

    const predictedApproved = (jobs: ContributionJob[]) => jobs.filter((j) => j.contribution.predicted_outcome.prediction === 'approved');

    $: series = [
        // {
        //     name: "All PRs: Avg. Time to Merge (hours)",
        //     data: buildTimeToMergeSeries(groupByWeek(latestJobsForContribution)),
        // },
        {
            name: "Approved by Codeball: Avg. Time to Merge (hours)",
            data: buildTimeToMergeAvgSeries(groupByWeek(predictedApproved(latestJobsForContribution))),
        },
        {
            name: "Approved by Codeball: Median. Time to Merge (hours)",
            data: buildTimeToMergeMedianSeries(groupByWeek(predictedApproved(latestJobsForContribution))),
        },
    ]

    const buildAddedCodeballAnnotation = (firstJob: Job | null) => {
        if (!firstJob) {
            return null
        }

        return {
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

    let xaxis = {
        type: 'datetime'
    }

    let chart = {
        type: "line",
        toolbar: {
            // show: false,
        },
        height: '400px',
    }

    let stroke = {
        curve: 'smooth',
    }

    let fill = {
        type: 'gradient'
    }

    $: annotations = {
        xaxis: [buildAddedCodeballAnnotation(firstJobFromActions)].filter(Boolean)
    }
</script>


<Chart
        series={series}
        xaxis={xaxis}
        chart={chart}
        stroke={stroke}
        fill={fill}
        annotations={annotations}
/>

<pre>
	jobs.length: {jobs.length}
    mergedJobs.length: {mergedJobs.length}
    jobsByContributionURL.size: {jobsByContributionURL.size}
    latestJobsForContribution.length: {latestJobsForContribution.length}
    gitHubActionJobs.length: {gitHubActionJobs.length}
    firstJobAt: {firstJobFromActions?.created_at}

    <!--

    <div  bind:this={chartEl} />

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
