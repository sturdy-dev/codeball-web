<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { get, type Job } from '$lib/jobs';
	export const load: Load = async ({ params }) => ({
		status: 200,
		props: { job: await get(params.id) }
	});
</script>

<script lang="ts">
	import { Single } from '$lib/components/jobs';

	export let job: Job;
</script>

<div class="m-auto flex max-w-6xl flex-col justify-around">
	<Single {job} />
	<div class="mt-8 flex justify-around font-mono">
		<ul class="flex gap-2">
			<li>[<a href="/faq">faq</a>]</li>
			<li>[<a href="/how">how</a>]</li>
		</ul>
	</div>
</div>
