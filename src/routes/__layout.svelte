<script context="module" lang="ts">
	import { get } from '$lib/github';
	import { NotFoundError } from '$lib/api';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async () =>
		get()
			.then(({ login }) => login)
			.catch((err) => {
				if (err instanceof NotFoundError) {
					return undefined;
				}
				throw err;
			})
			.then((login) => ({
				stuff: {
					title: 'Codeball | AI-powered code review',
					description: 'AI-powered code review',
					ogimage: 'https://codeball.ai/og-image.png',
					login
				},
				props: { login }
			}));
</script>

<script lang="ts">
	import '../app.css';
	import favIcon from '$lib/assets/CodeballIcon-128.ico';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';
	import { browser, dev } from '$app/env';
	import { webVitals } from '$lib/vitals';
	import Header from '$lib/Header.svelte';

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
</svelte:head>

{#if $page.stuff.showAnnouncementBanner}
	<a href="/blog/one-point-zero">
		<div class="bg-orange-400 p-2 text-center text-xl font-bold text-white">
			🧠📣 Codeball 1.0 is here!
		</div>
	</a>
{/if}

<main class="mb-16 min-h-screen bg-white md:mx-auto md:max-w-7xl">
	<Header {login} />
	<slot />
</main>
