<script lang="ts">
	import { isFinalStatus, type ContributionJob } from '$lib/jobs';
	import Spinner from '$lib/Spinner.svelte';
	import { formatDistance } from 'date-fns';

	export let jobs: ContributionJob[];

	const getRelativeTime = (date: Date, baseDate = new Date()): string =>
		formatDistance(date, baseDate, { addSuffix: true });

	const contributionOpenDuration = (c: ContributionJob) => {
		return getRelativeTime(new Date(c.contribution.merged_at), new Date(c.contribution.created_at));
	};
</script>

<section class="flex flex-col divide-y divide-gray-900 bg-white">
	<div
		class="flex w-full items-center gap-6 bg-gray-900 p-3 text-center text-sm font-semibold text-white"
	>
		<span class="hidden grow sm:block"> PULL REQUEST </span>
		<span class="hidden w-32 sm:block"> WHAT YOU DID </span>
		<span class="hidden w-32 sm:block"> WHAT THE AI DID </span>
		<span class="block grow sm:hidden"> PULL REQUESTS </span>
	</div>

	{#each jobs as job}
		{@const isRunning = !isFinalStatus(job.status)}
		{@const isFalsePositive =
			!job.contribution.merged_without_objections && job.contribution.result === 'approved'}
		{@const isTruePositive =
			job.contribution.merged_without_objections && job.contribution.result === 'approved'}

		<div class="flex flex-col items-center gap-6 p-3 sm:flex-row">
			<a
				class="col-span-2 grow grow overflow-hidden text-sm text-gray-900 sm:col-span-1"
				href={job.contribution.url}
			>
				<code class="text-gray-500">#{job.contribution.number}</code>
				{job.contribution.title}
			</a>

			<span class="flex w-full justify-around gap-6 sm:hidden">
				<span>YOU</span>
				<span>AI</span>
			</span>

			<span class="flex w-full justify-around gap-6 sm:w-fit">
				<span class="flex flex-col items-center">
					<span class="block w-32 py-2 text-center text-xs font-semibold leading-5">
						{job.contribution.merged_without_objections ? 'LGTM' : 'GAVE FEEDBACK'}
					</span>
					{#if job.contribution.merged_without_objections}
						<span class="block text-center text-xs text-gray-400"
							>{contributionOpenDuration(job)}</span
						>
					{/if}
				</span>

				<span
					class="flex flex-col items-center"
					class:pb-4={job.contribution.merged_without_objections}
				>
					{#if isRunning}
						<span class="flex w-32 items-center justify-center py-2">
							<Spinner />
						</span>
					{:else}
						<span
							class="block w-32 py-2 text-center text-xs font-semibold leading-5"
							class:bg-green-100={isTruePositive}
							class:text-green-800={isTruePositive}
							class:bg-red-100={isFalsePositive}
							class:text-red-800={isFalsePositive}
						>
							{job.contribution.result === 'approved' ? 'APPROVED' : 'NOT APPROVED'}
						</span>
					{/if}
				</span>
			</span>
		</div>
	{/each}
</section>
