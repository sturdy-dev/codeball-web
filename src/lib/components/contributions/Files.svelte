<script lang="ts">
	import { type ContributionJob } from '$lib/jobs';
	export let job: ContributionJob;

	$: files = job.contribution?.files.map((file, idx) => {
		return {
			name: file.name,
			confidence: job.contribution.predicted_outcome.file_probabilities[idx]
		};
	});
</script>

<div class="flex flex-col">
	{#each files as file}
		<div
			class="flex justify-between gap-x-8"
			class:text-green-800={file.confidence > 0.95}
			class:text-yellow-800={file.confidence > 0.8 && file.confidence <= 0.95}
			class:text-red-800={file.confidence < 0.2}
		>
			<span>{file.name}</span>
			<span>{file.confidence.toFixed(2)}</span>
		</div>
	{/each}
</div>
