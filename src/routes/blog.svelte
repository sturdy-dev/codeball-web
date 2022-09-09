<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async () => ({
		stuff: {
			title: 'Codeball Blog',
			description: 'Latest blogs from the Codeball team'
		}
	});
</script>

<script lang="ts">
	import ReadMore from '$lib/blog/ReadMore.svelte';
</script>

<article class="font-mono">
	<h1 class="text-6xl font-black tracking-tight">Blog</h1>
	<ReadMore title="Latest posts" />
</article>
