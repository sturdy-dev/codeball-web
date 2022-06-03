<script lang="ts">
	import type { ContributionJob } from '$lib/jobs';
	export let job: ContributionJob;
</script>

<div class="sm:flex sm:items-center">
	<div class="text-center sm:flex-auto">
		<h1 class="text-center text-2xl font-semibold text-gray-900">
			Codeball could not analyze the repository
		</h1>
		<p class="mt-2 text-sm text-gray-700">
			{job.error?.message}
		</p>
	</div>
</div>
