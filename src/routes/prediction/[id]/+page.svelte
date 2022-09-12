<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import type { Load } from '@sveltejs/kit';
	// import { get, type Job } from '$lib/jobs';
	// export const load: Load = async ({ params }) => ({
	// 	status: 200,
	// 	props: { job: await get(params.id) }
	// });
</script>

<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { Single } from '$lib/components/jobs';

	export let job: Job;
</script>

<div class="m-auto flex max-w-6xl flex-col justify-around">
	<Single {job} />
</div>
