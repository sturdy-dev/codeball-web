<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { get, type Job } from '$lib/jobs';
	export const load: Load = async ({ params, fetch }) => ({
		status: 200,
		props: { job: await get(params.id, { fetch }) }
	});
</script>

<script lang="ts">
	import { Single } from '$lib/components/jobs';

	export let job: Job;
</script>

<div class="m-auto flex max-w-6xl flex-col justify-around">
	<Single {job} />
</div>
