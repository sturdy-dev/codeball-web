<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { list } from '$lib/jobs';
	export const load: Load = async ({ params }) => {
		const { organization, repository } = params;
		const { jobs } = await list({ organization, repository });
		return { props: { jobs } };
	};
</script>

<script lang="ts">
	import type { Job } from '$lib/jobs';
	import { Jobs, Stats } from '$lib/components/dashboard';
	import { page } from '$app/stores';
	import { GitHubLoginButton } from '$lib/components/index';

	export let jobs: Job[];
</script>

<div class="flex flex-col space-y-2 font-mono">
	{#if jobs.length > 0}
		<Stats {jobs} />
		<Jobs {jobs} />
	{:else}
		<div class="space-y-2 text-gray-600">
			<p>
				No jobs found for
				<span class="text-black">
					{$page.params.organization}/{$page.params.repository}
				</span> (or access denied).
			</p>
			<GitHubLoginButton showText={true} />
		</div>
	{/if}
</div>
