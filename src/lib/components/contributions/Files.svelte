<script lang="ts">
	import { type ContributionJob } from '$lib/jobs';

	export let job: ContributionJob;

	const build = (job: ContributionJob) => {
		if (!job.contribution.files) {
			return [];
		}

		if (
			job.contribution.files.length !== job.contribution.predicted_outcome.file_probabilities.length
		) {
			return [];
		}

		return job.contribution?.files.map((file, idx) => {
			return {
				name: file.name,
				confidence: job.contribution.predicted_outcome.file_probabilities[idx]
			};
		});
	};

	$: files = build(job);
</script>

<div class="flex flex-col">
	{#each files as file}
		<div
			class="flex justify-between gap-x-8"
			class:text-green-800={file.confidence > 0.92}
			class:text-yellow-800={file.confidence > 0.8 && file.confidence <= 0.92}
			class:text-red-800={file.confidence < 0.2}
		>
			<span class="overflow-hidden truncate" style="direction: rtl;">{file.name}</span>
			<span class="shrink-0">{file.confidence.toFixed(2)}</span>
		</div>
	{:else}
		<div class="text-center">No files found :-(</div>
	{/each}
</div>
