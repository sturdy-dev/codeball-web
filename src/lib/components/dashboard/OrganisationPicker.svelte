<script lang="ts">
	import { type ContributionJob, type Job } from '$lib/jobs';

	export let jobs: Job[];

	$: jobsWithPrediction = jobs.filter(
		(j) => j?.contribution?.predicted_outcome
	) as ContributionJob[];

	const unique = (value, index, self) => {
		return self.indexOf(value) === index;
	};

	$: orgRepos = jobsWithPrediction
		.map((j: ContributionJob) => j.contribution.url.split('/').slice(3, 5).join('/'))
		.filter(unique)
		.sort((a, b) => a.localeCompare(b));
</script>

<div class="flex flex-col space-y-2">
	<div class="bg-gray-900 p-3 text-center text-sm font-semibold text-white">FILTER</div>

	{#each orgRepos as orgRepo}
		<a href={orgRepo}>▶️ {orgRepo}</a>
	{/each}
</div>
