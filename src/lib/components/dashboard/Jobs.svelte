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
		(j) => j?.contribution?.predicted_outcome && j.meta.user_agent === 'github-actions'
	) as ContributionJob[];

	$: jobsByContributionURL = groupByToMap(
		jobsWithPrediction,
		(j: ContributionJob) => j.contribution.url
	);

	const byPredictedAtDesc = (a: ContributionJob, b: ContributionJob) =>
		b.contribution.predicted_outcome.predicted_at.localeCompare(
			a.contribution.predicted_outcome.predicted_at
		);

	const getLatestByURL = (jobsMap: Map<string, ContributionJob[]>): ContributionJob[] => {
		let res = [];
		for (const [url, jobs] of jobsMap) {
			const first = jobs.sort(byPredictedAtDesc)[0];
			res.push(first);
		}
		return res;
	};

	const getRelativeTime = (date: Date, baseDate = new Date(), addSuffix = true): string =>
		formatDistance(date, baseDate, { addSuffix });

	const contributionOpenDuration = (c: ContributionJob) => {
		return getRelativeTime(
			new Date(c.contribution.created_at),
			new Date(c.contribution.actual_outcome.merged_at),
			false
		);
	};

	const minProbability = (c: ContributionJob) => {
		const probs = c.contribution?.predicted_outcome?.file_probabilities ?? [0];
		return Math.min(...probs);
	};

	const contributionCreatedAtDuration = (c: ContributionJob) => {
		return getRelativeTime(new Date(c.contribution.created_at));
	};

	const gitHubActionEvents = (c: ContributionJob): Event[] => {
		const events = c?.events?.filter((e) => e.type === 'github_action') || [];

		return events.sort((a, b) => a.created_at.localeCompare(b.created_at));
	};

	$: latestJobsForContribution = getLatestByURL(jobsByContributionURL).sort(byPredictedAtDesc);

	$: showJobs = latestJobsForContribution;
</script>

<section class="flex flex-col  bg-white">
	<div
		class="flex w-full items-center gap-6 bg-gray-900 p-3 text-center text-sm font-semibold text-white"
	>
		<span class="hidden grow sm:block"> PULL REQUESTS </span>
	</div>

	{#each showJobs as job}
		{@const codeballApproved = job.contribution.predicted_outcome.prediction === 'approved'}
		{@const haveActualOutcome = !!job.contribution.actual_outcome}
		{@const isMerged = job.contribution.actual_outcome?.merged_at}
		{@const isClosed = job.contribution.actual_outcome?.closed_at}
		{@const isOpen = !job.contribution.actual_outcome}
		{@const events = gitHubActionEvents(job)}
		{@const prob = minProbability(job)}

		<div class="space-y-2 border-b-2 border-gray-900 p-3">
			<div class="flex flex-col items-start gap-6 sm:flex-row">
				<div class="flex grow flex-col">
					<a class="overflow-hidden text-sm text-gray-900" href={job.contribution.url}>
						<code class="text-gray-500">#{job.contribution.number}</code>
						{job.contribution.title}
					</a>

					<span class="text-sm text-gray-500">{contributionCreatedAtDuration(job)}</span>
				</div>

				<div class="space-y-1">
					<span
						class="block w-32 py-2 text-center text-xs font-semibold leading-5"
						class:bg-green-100={codeballApproved}
						class:text-green-800={codeballApproved}
					>
						{codeballApproved ? 'CODEBALL 👍' : 'NOT APPROVED'}
					</span>

					<span class="block text-center text-xs text-gray-400" title="Confidence"
						>{prob.toFixed(3)}</span
					>
				</div>

				<div class="space-y-1">
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
					{#if isMerged}
						<span class="block text-center text-xs text-gray-400">
							{contributionOpenDuration(job)}
						</span>
					{/if}
				</div>
			</div>

			{#if events.length > 0}
				<div>
					<span class="text-sm text-gray-400">Actions</span>
					<div class="flex space-x-2">
						{#each events as event, i}
							{@const isLast = i === events.length - 1}
							<div
								class="p-2"
								class:bg-red-100={event.github_action.error !== null}
								class:text-red-800={event.github_action.error !== null}
								class:bg-green-100={event.github_action.error === null}
								class:text-green-800={event.github_action.error === null}
							>
								{event.github_action.name}
							</div>
							{#if !isLast}
								<div class="py-2">👉</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</section>
