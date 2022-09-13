<script lang="ts">
	import '../app.css';
	import favIcon from '$lib/assets/CodeballIcon-128.ico';
	import { page } from '$app/stores';
	import { browser, dev } from '$app/environment';
	import { webVitals } from '$lib/vitals';
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';

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

<slot />
