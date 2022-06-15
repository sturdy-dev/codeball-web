<script lang="ts">
	import { isPublic as isJobPublic, list, type Job } from '$lib/jobs';
	import { Jobs, Stats } from '$lib/components/dashboard';
	import { Subscribe } from '$lib/components/subscriptions';
	import Spinner from '$lib/Spinner.svelte';
	import { compareAsc } from 'date-fns';

	export let jobs: Job[] = [];
	export let loading = false;
	export let organization: string;

	$: latestJob = jobs
		.sort((a, b) => compareAsc(new Date(a.created_at), new Date(b.created_at)))
		.slice(-1)[0];
	$: isPublic = latestJob ? isJobPublic(latestJob) : false;
</script>

{#if loading}
	<div class="flex justify-around">
		<Spinner />
	</div>
{/if}

{#if isPublic}
	<h2>Thank you for being open source!</h2>
	<p>Codeball is free for open source projects.</p>
{:else}
	<Subscribe {organization} />
{/if}

<Stats {jobs} />
<Jobs {jobs} />
