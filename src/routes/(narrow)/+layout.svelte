<script context="module" lang="ts">
	// throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import { get } from '$lib/github';
	// import { NotFoundError } from '$lib/api';
	// import type { Load } from '@sveltejs/kit';

	// export const load: Load = async () =>
	// 	get()
	// 		.then(({ login }) => login)
	// 		.catch((err) => {
	// 			if (err instanceof NotFoundError) {
	// 				return undefined;
	// 			}
	// 			throw err;
	// 		})
	// 		.then((login) => ({
	// 			stuff: {
	// 				title: 'Codeball | AI-powered code review',
	// 				description: 'AI-powered code review',
	// 				ogimage: 'https://codeball.ai/og-image.png',
	// 				login
	// 			},
	// 			props: { login }
	// 		}));
</script>

<script lang="ts">
	import '../../app.css';
	import favIcon from '../../lib/assets/CodeballIcon-128.ico';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';
	import { browser, dev } from '$app/environment';
	import { webVitals } from '../../lib/vitals';
	import Header from '../../lib/Header.svelte';
	import Footer from '../../lib/Footer.svelte';

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
