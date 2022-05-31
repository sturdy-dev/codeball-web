<script lang="ts">
	import { Single as Repository } from '$lib/components/repositories';
	import { Single as Contribution } from '$lib/components/contributions';
	import Spinner from '$lib/Spinner.svelte';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import {
		get,
		toRepositoryJob,
		toContributionJob,
		isContributionJob,
		isFinalStatus,
		isRepositoryJob,
		type ContributionJob,
		type RepositoryJob
	} from '$lib/jobs';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const job = writable(null as RepositoryJob | ContributionJob | null);
	$: error = null;

	const reload = () =>
		get($page.params.id)
			.then((result) => {
				if (isRepositoryJob(result)) {
					job.set(result as RepositoryJob);
					const isCrawling = !isFinalStatus(result.status);
					const isDeriving = result.repository?.contribution_jobs?.some(
						({ status }) => !isFinalStatus(status)
					);
					const shouldUpdate = isDeriving || isCrawling;
					if (shouldUpdate) setTimeout(reload, 1000);
				} else if (isContributionJob(result)) {
					job.set(result as ContributionJob);
					const isDeriving = !isFinalStatus(result.status);
					const shouldUpdate = isDeriving;
					if (shouldUpdate) setTimeout(reload, 1000);
				}
			})
			.catch((err) => {
				error = err;
			});
	onMount(reload);
</script>

<div class="m-auto flex max-w-6xl flex-col justify-around">
	{#if error}
		<div class="flex justify-around">
			<div class="flex flex-col">
				<div class="inline-flex items-center text-2xl text-gray-700">
					<p>Something went wrong...</p>
				</div>
				<div class="inline-flex items-center text-lg text-gray-700">
					<p>{error}</p>
				</div>
			</div>
		</div>
	{:else if $job === null}
		<div class="inline-flex items-center justify-around text-2xl text-gray-700">
			<span class="inline-flex"><Spinner /> loading...</span>
		</div>
	{:else if isContributionJob($job)}
		<Contribution job={toContributionJob($job)} />
	{:else if isRepositoryJob($job)}
		<Repository job={toRepositoryJob($job)} />
	{:else}
		<div class="flex justify-around">
			<div class="flex flex-col">
				<div class="inline-flex items-center text-2xl text-gray-700">
					<p>Something went wrong...</p>
				</div>
				<div class="inline-flex items-center text-lg text-gray-700">
					<p>🤷‍♂️</p>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center">
			<div class="mt-8">
				<Button href="/">Test another repository</Button>
			</div>
		</div>
	{/if}

	<div class="mt-8 flex justify-around font-mono">
		<ul class="flex gap-2">
			<li>[<a href="/faq">faq</a>]</li>
			<li>[<a href="/how">how</a>]</li>
		</ul>
	</div>
</div>
