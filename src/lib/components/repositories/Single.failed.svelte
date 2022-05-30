<script lang="ts">
	import type { Job } from '$lib/jobs';
	import GitHubLoginButton from '../index/GitHubLoginButton.svelte';
	export let job: Job;
</script>

<div class="sm:flex sm:items-center">
	<div class="text-center sm:flex-auto">
		<h1 class="text-center text-2xl font-semibold text-gray-900">
			Codeball could not analyze the repository
		</h1>
		<p class="mt-2 text-sm text-gray-700">
			{job.error.message}
		</p>
		<p class="mt-8 text-gray-600">
			Is this a private repo? You might need to login or update the permissions

			<GitHubLoginButton />
		</p>
	</div>
</div>
