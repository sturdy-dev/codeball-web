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

	export let login: string | null;

	onMount(() => {
		if (!dev) {
			posthog.init('phc_5wtSq4CFj2AtKs04bAwFrP8ohmH0OKWmxy0QxZUMY1W');
			if (login) posthog.identify(`${login}@github`);
		}
	});
</script>

<!---
<svelte:head>
	<title>{$page.stuff.title}</title>
	<meta name="description" content={$page.stuff.description} />
	<link rel="icon" type="image/svg" href={favIcon} />
	<meta property="og:image" content={$page.stuff.ogimage} />
	<meta property="og:title" content={$page.stuff.title} />
	<meta property="og:description" content={$page.stuff.description} />
	<meta name="twitter:card" content="summary_large_image" />

	{#if !dev}
		<script
			async
			defer
			data-website-id="a9b93947-2a07-4d7c-bd02-ba2dce8d446a"
			src="https://umami.codeball.ai/umami.js"></script>
	{/if}
</svelte:head> --->

<main class="min-h-screen w-full bg-orange-50">
	<Header {login} />

	<slot />

	<Footer />
</main>
