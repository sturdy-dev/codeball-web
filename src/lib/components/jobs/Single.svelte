<script lang="ts">
	import { Single as Repository } from '$lib/components/repositories';
	import { Single as Contribution } from '$lib/components/contributions';
	import Spinner from '$lib/Spinner.svelte';
	import {
		get,
		toRepositoryJob,
		toContributionJob,
		isContributionJob,
		isFinalStatus,
		isRepositoryJob,
		type Job
	} from '$lib/jobs';
	import { writable } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';

	export let job: Job;

	const store = writable(job);
	$: error = null;
	let timeout: ReturnType<typeof setTimeout> | null = null;

	const reload = () =>
		get(job.id)
			.then((result) => {
				store.set(result);
				if (isRepositoryJob(result)) {
					const isCrawling = !isFinalStatus(result.status);
					const isDeriving = result.repository?.contribution_jobs?.some(
						({ status }) => !isFinalStatus(status)
					);
					const shouldUpdate = isDeriving || isCrawling;
					if (shouldUpdate) {
						timeout = setTimeout(reload, 1000);
					}
				} else if (isContributionJob(result)) {
					const isDeriving = !isFinalStatus(result.status);
					const shouldUpdate = isDeriving;
					if (shouldUpdate) {
						timeout = setTimeout(reload, 1000);
					}
				} else {
					throw new Error('unknown job type');
				}
			})
			.catch((err) => {
				error = err;
			});

	onMount(reload);
	onDestroy(() => {
		if (timeout) {
			clearTimeout(timeout);
		}
	});
</script>

<div class="m-auto flex w-full max-w-6xl flex-col justify-around">
	{#if error}
		<div class="flex justify-around">
			<div class="flex flex-col">
				<div class="inline-flex items-center text-2xl text-gray-700">
					<p>Something went wrong...</p>
				</div>
				{#if $store?.error?.message}
					<div class="inline-flex items-center text-lg text-gray-700">
						<p>{$store.error.message}</p>
					</div>
				{/if}
			</div>
		</div>
	{:else if $store === null}
		<div class="inline-flex items-center justify-around text-2xl text-gray-700">
			<span class="inline-flex"><Spinner /> loading...</span>
		</div>
	{:else if isContributionJob($store)}
		<Contribution job={toContributionJob($store)} />
	{:else if isRepositoryJob($store)}
		<Repository job={toRepositoryJob($store)} />
	{/if}
</div>
