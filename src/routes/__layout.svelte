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
	import { dev } from '$app/env';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';

	export let login: string | null;

	const header = [
		{ href: '/how', title: 'how' },
		{ href: '/pricing', title: 'pricing' },
		{ href: 'https://github.com/sturdy-dev/codeball-action', title: 'github action' },
		{ href: '/faq', title: 'faq' },
		{ href: '/blog', title: 'blog' }
	];

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

<main class="min-h-screen bg-stone-100">
	<div class="p-4 md:mx-auto md:max-w-7xl">
		<header
			class="mb-4 flex flex-col items-center gap-4 border-b-2 border-gray-400 bg-stone-100 pb-4 font-mono text-black md:mb-0 md:flex-row md:border-b-0"
		>
			<a class="text-2xl md:pr-12" href="/">Codeball</a>
			<div class="grid flex-1	grid-cols-2	 gap-x-4 md:flex md:space-x-2 ">
				{#each header as { href, title }}
					<a
						class:text-red-700={$page.url.pathname === href}
						class:font-semibold={$page.url.pathname === href}
						class="whitespace-nowrap"
						{href}>[{title}]</a
					>
				{/each}

				<div class="hidden flex-1 md:block" />

				{#if login}
					<a
						class:text-red-700={$page.url.pathname === '/dashboard'}
						class:font-semibold={$page.url.pathname === '/dashboard'}
						href="/dashboard">[dashboard]</a
					>
				{:else}
					<a href={`/github/oauth`}>[login]</a>
				{/if}
			</div>
		</header>

		<slot />
	</div>
</main>
