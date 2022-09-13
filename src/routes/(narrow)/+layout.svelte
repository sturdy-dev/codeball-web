<script lang="ts">
	import '../../app.css';
	import favIcon from '$lib/assets/CodeballIcon-128.ico';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';
	import { browser, dev } from '$app/environment';
	import { webVitals } from '$lib/vitals';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	const analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (!dev && browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}

	export let data;

	onMount(() => {
		if (!dev) {
			posthog.init('phc_5wtSq4CFj2AtKs04bAwFrP8ohmH0OKWmxy0QxZUMY1W');
			if (data.login) posthog.identify(`${data.login}@github`);
		}
	});
</script>

<svelte:head>
	<title>{$page.data.meta.title}</title>
	<meta name="description" content={$page.data.meta.description} />
	<link rel="icon" type="image/svg" href={favIcon} />
	<meta property="og:image" content={$page.data.meta.ogimage} />
	<meta property="og:title" content={$page.data.meta.title} />
	<meta property="og:description" content={$page.data.meta.description} />
	<meta name="twitter:card" content="summary_large_image" />

	{#if !dev}
		<script
			async
			defer
			data-website-id="a9b93947-2a07-4d7c-bd02-ba2dce8d446a"
			src="https://umami.codeball.ai/umami.js"></script>
	{/if}
</svelte:head>

<main class="flex min-h-screen flex-col items-center bg-white">
	<div class="w-full max-w-7xl flex-shrink-0">
		<Header login={data.login} />
	</div>

	<div class="w-full max-w-7xl flex-1 p-4">
		<slot />
	</div>

	<div class="w-full bg-orange-50">
		<Footer />
	</div>
</main>
