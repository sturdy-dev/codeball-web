<script lang="ts">
	import Failed from './Single.failed.svelte';
	import Running from './Single.running.svelte';
	import { type ContributionJob, isFinalStatus } from '$lib/jobs';
	import Files from './Files.svelte';

	export let job: ContributionJob;
	$: isApproved = job.contribution.result === 'approved';

	let showConfidence = true;
	const toggleShowFileConfidence = () => {
		showConfidence = !showConfidence;
	};
</script>

<div class="flex flex-col gap-12 font-mono">
	{#if job.status === 'failure'}
		<Failed {job} />
	{:else if !isFinalStatus(job.status)}
		<Running {job} />
	{:else if job.contribution}
		<div class="flex flex-col items-center space-y-8">
			<h1 class="text-center text-2xl font-semibold text-gray-900">
				<a href={job.contribution.url}>#{job.contribution.number} {job.contribution.title}</a>
			</h1>

			<div>
				<span
					class="block w-32 py-2 text-center text-xs font-semibold leading-5"
					class:bg-green-100={isApproved}
					class:text-green-800={isApproved}
					class:bg-stone-200={!isApproved}
					class:text-stone-800={!isApproved}
				>
					{isApproved ? 'APPROVED' : 'NOT APPROVED'}
				</span>
			</div>

			<div class="flex justify-around font-mono">
				<ul class="flex gap-2">
					<li>
						[<a href="/{job.contribution.organization}/{job.contribution.repository}">dashboard</a>]
					</li>
					<li>
						[<a class="cursor-pointer" on:click={toggleShowFileConfidence}>
							{showConfidence ? 'hide confidence' : 'show confidence'}</a
						>]
					</li>
				</ul>
			</div>
		</div>
	{/if}

	{#if showConfidence}
		<Files {job} />
	{/if}
</div>
