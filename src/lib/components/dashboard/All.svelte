<script lang="ts">
	import { type Job } from '$lib/jobs';
	import { Jobs, Stats, OrganisationPicker, Histogram } from '$lib/components/dashboard';

	const githubAppName = import.meta.env.VITE_GITHUB_APP_NAME;

	export let jobs: Job[] = [];
</script>

<Stats {jobs} />

<div class="flex space-x-2">
	<div class="flex flex-col space-y-2">
		<OrganisationPicker {jobs} />

		<div class="flex flex-col space-y-2">
			<div class="bg-gray-900 p-3 text-center text-sm font-semibold text-white">MORE</div>
			<a href="/subscriptions">[manage subscriptions]</a>
			<span class="whitespace-nowrap">
				[<a
					class="text-gray-800 hover:text-black"
					href="https://github.com/apps/{githubAppName}/installations/new"
					>add/update access to repos</a
				>]</span
			>
		</div>
	</div>

	<div class="grow">
		<Jobs {jobs} />
	</div>
</div>
