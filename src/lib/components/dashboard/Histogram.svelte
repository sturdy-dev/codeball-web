<script lang="ts">
	import { type ContributionJob, type Job } from '$lib/jobs';

	export let jobs: Job[];

	const minProbability = (c: ContributionJob) => {
		const probs = c.contribution?.predicted_outcome?.file_probabilities ?? [0];
		return Math.min(...probs);
	};

	const bucket = (prob: number) => {
		return (Math.floor(prob * 20) / 20).toFixed(2); // round to nearest 0.5
	};

	const build = (jobs: Job[]) => {
		let counts = new Map<string, number>();

		// create all buckets
		for (let i = 0; i < 1; i += 0.05) {
			counts[i.toFixed(2)] = 0;
		}

		for (const job of jobs) {
			const b = bucket(minProbability(job));
			counts[b]++;
		}

		let b = [];
		for (const [bucket, count] of Object.entries(counts)) {
			b.push({
				bucket,
				count
			});
		}

		return b;
	};

	const getHeight = (count) => {
		return (count / largestBucketSize) * 120;
	};

	$: histogram = build(jobs);
	$: histogramBucketSorted = [...histogram].sort((a, b) => a.bucket.localeCompare(b.bucket));
	$: largestBucketSize = [...histogram].sort((a, b) => b.count - a.count)[0].count;
</script>

<div class="flex w-full justify-center xl:gap-1">
	{#each histogram as h}
		<div class="flex flex-col">
			<div class="flex-1" />
			<div
				style="height: {getHeight(h.count)}px"
				class="inline-flex items-end justify-center bg-orange-100 text-xs text-orange-900 lg:text-base"
			>
				{h.count}
			</div>
			<div class="p-0.5 text-xs">
				{h.bucket}
			</div>
		</div>
	{/each}
</div>
