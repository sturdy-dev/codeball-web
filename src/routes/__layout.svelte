<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball -> AI-powered code review'
		}
	});
</script>

<script lang="ts">
	import '../app.css';
	import favIcon from '$lib/assets/CodeballIcon-128.ico';
	import ogImage from '$lib/assets/github_bg.png';
	import { dev } from '$app/env';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.stuff.title}</title>
	<meta name="description" content="AI-powered code review" />
	<meta name="og:image" content={ogImage} />
	<link rel="icon" type="image/svg" href={favIcon} />

	{#if !dev}
		<script
			async
			defer
			data-website-id="a9b93947-2a07-4d7c-bd02-ba2dce8d446a"
			src="https://umami.codeball.ai/umami.js"></script>
	{/if}
</svelte:head>

<main class="min-h-screen bg-stone-100">
	<div class="p-4 md:mx-auto md:max-w-7xl">
		<header class="bg-stone-100 pb-4 font-mono text-2xl text-black">
			<a href="/">Codeball<sup class="text-red-700">beta</sup></a>
		</header>

		<slot />
	</div>
</main>
