<script lang="ts">
	import Failed from './Single.failed.svelte';
	import Running from './Single.running.svelte';
	import MoneySavedCalculator from './MoneySavedCalculator.svelte';
	import { isFinalStatus, type RepositoryJob } from '$lib/jobs';
	import { Table } from '$lib/components/contributions';
	import Button from '$lib/Button.svelte';
	import AddAction from './AddAction.svelte';

	export let job: RepositoryJob;

	const not =
		(f: (...args: any[]) => any) =>
		(...args: any[]) =>
			!f(...args);

	$: isRunning =
		!isFinalStatus(job.status) ||
		job.repository.contribution_jobs.map(({ status }) => status).some(not(isFinalStatus));
</script>

<div class="flex flex-col gap-12 font-mono">
	{#if job.status === 'failure'}
		<Failed {job} />
	{:else}
		{#if isRunning}
			<Running {job} />
		{:else if job.repository.contribution_jobs && job.repository.contribution_jobs.length > 0}
			<MoneySavedCalculator {job} />
		{/if}

		{#if job.repository.contribution_jobs && job.repository.contribution_jobs.length > 0}
			<Table jobs={job.repository?.contribution_jobs} />
		{:else if isFinalStatus(job.status)}
			<div class="flex justify-around">
				<div class="flex flex-col">
					<div class="text-center text-2xl text-gray-700">No contributions found!</div>
					<div class="text-center">
						<span>[we're sorry, there's not much we can do here...]</span>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>

<div class="flex flex-col items-center">
	<div class="mt-8 space-y-2">
		<Button color="white" href="/">Test another repository</Button>
		<AddAction {job} />
	</div>
</div>
