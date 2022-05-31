<script lang="ts">
	import Button from '$lib/Button.svelte';
	import AddAction from '$lib/AddAction.svelte';
	import type { Job, ContributionJob } from '$lib/jobs';
	import RangeSlider from 'svelte-range-slider-pips';

	export let job: Job;

	$: jobs = job.repository?.contribution_jobs || [];

	$: contributionsCount = jobs.length;
	$: correctlyApprovedContributionsCount = jobs.filter(
		(c) => c.contribution.result === 'approved' && c.contribution.merged_without_objections
	).length;
	$: incorrectlyApprovedContributionsCount = jobs.filter(
		(c) => c.contribution.result === 'approved' && !c.contribution.merged_without_objections
	).length;
	$: mergedWithoutObjectionCount = jobs.filter(
		(c) => c.contribution.merged_without_objections
	).length;

	$: sortedContributionsByDate = jobs.sort((a, b) =>
		a.contribution.created_at.localeCompare(b.contribution.created_at)
	);

	$: firstContribution = sortedContributionsByDate[0];
	$: lastContribution = sortedContributionsByDate[sortedContributionsByDate.length - 1];

	const contributionOpenedAtUnixMillis = (c: ContributionJob): number => {
		return Date.parse(c.contribution.created_at);
	};

	$: daysBetweenFirstAndLastPR =
		(contributionOpenedAtUnixMillis(lastContribution) -
			contributionOpenedAtUnixMillis(firstContribution)) /
		1000 /
		60 /
		60 /
		24;
	$: approxPullsPerDay = jobs.length / daysBetweenFirstAndLastPR;
	$: approxMonthlyPullRequestsCreated = daysBetweenFirstAndLastPR > 0 ? 31 * approxPullsPerDay : 1;

	// sliders
	let approvedPullRequestsPerMonth = [10];
	let minutesSavedPerPullRequest = [20];
	let developerHourlySalary = [120];

	$: hoursSavedPerPullRequest = Math.ceil((minutesSavedPerPullRequest[0] / 60) * 100) / 100; // rounded to 2 decimals
	$: codeballSaved = Math.round(
		approvedPullRequestsPerMonth[0] * hoursSavedPerPullRequest * developerHourlySalary[0]
	);
	$: approvalRatio = correctlyApprovedContributionsCount / jobs.length;
	$: approxMonthlyApproved = Math.ceil(approxMonthlyPullRequestsCreated * approvalRatio);
	$: approvedPullRequestsPerMonth[0] = approxMonthlyApproved;

	const numberFormat = new Intl.NumberFormat('en-US');

	const salaryEmoji = (salary: number) => {
		if (salary < 100) {
			return '💰';
		} else if (salary < 150) {
			return '🤑';
		} else if (salary < 150) {
			return '🤑';
		} else if (salary < 250) {
			return '💸';
		} else if (salary < 350) {
			return '🏦';
		} else {
			return '🚀';
		}
	};
</script>

<section class="flex flex-col items-center gap-4">
	<h1 class="text-center text-xl font-semibold text-gray-900">
		Results for {job.repository?.name}:
	</h1>

	<h2 class="text-center text-4xl font-semibold text-gray-900">
		{#if codeballSaved > 0}
			Codeball will save you ${numberFormat.format(codeballSaved)} per month
		{:else}
			This did not go as expected, please try again...
		{/if}
	</h2>

	<ul class="flex flex-col items-center gap-2 text-gray-700">
		<li>
			Analyzed <strong class="underline underline-offset-2">{contributionsCount}</strong> of the latest
			contributions
		</li>

		<li>
			<strong class="underline underline-offset-2">{mergedWithoutObjectionCount}</strong> where approved
			without further feedback
		</li>

		<li>
			Identified and correctly predicted that
			<strong class="underline underline-offset-2">{correctlyApprovedContributionsCount}</strong>
			of the contributions would be approved right away
		</li>

		<li>
			{#if incorrectlyApprovedContributionsCount === 0}
				Didn't approve any PR that you wouldn't have
			{:else}
				Approved <strong class="underline underline-offset-2"
					>{incorrectlyApprovedContributionsCount}</strong
				> PRs that you didn't
			{/if}
		</li>
	</ul>

	<div class="mt-4 mb-2 flex flex-col items-center gap-2">
		<AddAction {job} />
		<span>
			[<a href="https://github.com/sturdy-dev/codeball-action">sturdy-dev/codeball-action</a>]
		</span>
	</div>

	<table class="min-w-full divide-y divide-gray-900">
		<thead class="bg-gray-900 text-white">
			<tr>
				<th
					scope="col"
					class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold sm:pl-6"
					colspan="3"
				>
					THE MATH [SOURCE: TRUST ME BRO]
				</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-900 bg-white">
			<tr>
				<td class="px-3  py-4 text-right text-sm text-gray-900">&nbsp;</td>
				<td class="px-3  py-4 text-left text-sm text-gray-900">
					Pull Requests Auto-Approved / month
				</td>
				<td class="w-1/2  px-3 py-4 text-left text-sm text-gray-900">
					<strong>{numberFormat.format(approvedPullRequestsPerMonth[0])}</strong><br />
					<div
						class="text-base"
						style="--range-slider: gray;  --range-handle-focus:gray;  --range-float: transparent;  --range-float-inactive: transparent;"
					>
						<RangeSlider bind:values={approvedPullRequestsPerMonth} min={1} max={500} step={1} />
					</div>
				</td>
			</tr>
			<!--<tr>
				<td  colspan="2"></td>
				<td  class="p-2 text-xs text-gray-600">
					Between first and last = {daysBetweenFirstAndLastPR}<br>
					Daily PRs = ~{approxPullsPerDay.toFixed(2)}<br>
					Monthly PRs = ~{approxPullsPerDay.toFixed(2)} * 31 = {approxMonthlyPullRequestsCreated.toFixed(0)}<br>
					Codeball Approval Ratio = ~{(approvalRatio * 100).toFixed(0)}%<br>
					Codeball Monthly Approvals = ~{approxMonthlyPullRequestsCreated.toFixed(0)} * {approvalRatio.toFixed(2)} = {approvedPullRequestsPerMonth[0].toFixed(0)}
				</td>
			</tr>-->
			<tr>
				<td class="px-3  py-4 text-right text-sm text-gray-900">
					<strong>*</strong>
				</td>
				<td class="px-3  py-4 text-left text-sm text-gray-900"> Time Saved / Pull Request </td>
				<td class="w-1/2  px-3 py-4 text-left text-sm text-gray-900">
					<strong>{numberFormat.format(minutesSavedPerPullRequest[0])}</strong> minutes
					<i>(~{hoursSavedPerPullRequest} hours)</i><br />
					<div
						class="text-base"
						style="--range-slider: gray;  --range-handle-focus:gray;  --range-float: transparent;  --range-float-inactive: transparent;"
					>
						<RangeSlider bind:values={minutesSavedPerPullRequest} min={0} max={500} />
					</div>
				</td>
			</tr>
			<tr>
				<td class="px-3  py-4 text-right text-sm text-gray-900">
					<strong>*</strong>
				</td>
				<td class="px-3  py-4 text-left text-sm text-gray-900"> Developer Salary </td>
				<td class="w-1/2  px-3 py-4 text-left text-sm text-gray-900">
					<strong>${numberFormat.format(developerHourlySalary[0])}</strong> / hour<br />
					<div
						class="text-base"
						style="--range-slider: gray;  --range-handle-focus:gray;  --range-float: transparent;  --range-float-inactive: transparent;"
					>
						<RangeSlider
							bind:values={developerHourlySalary}
							min={0}
							max={500}
							float
							formatter={salaryEmoji}
						/>
					</div>
				</td>
			</tr>
			<tr>
				<td class="px-3  py-4 text-right text-sm text-gray-900">
					<strong>=</strong>
				</td>
				<td class="px-3  py-4 text-left text-sm text-gray-900"> Codeball will save you </td>
				<td class="px-3  py-4 text-left text-sm text-gray-900">
					<strong>${numberFormat.format(codeballSaved)}</strong> / month
				</td>
			</tr>
		</tbody>
	</table>
</section>
