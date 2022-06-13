<script context="module" lang="ts">
	import { get } from '$lib/github';
	import { NotFoundError } from '$lib/api';

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
				stuff: { title: 'Codeball -> AI-powered code review', login },
				props: { login }
			}));
</script>

<script lang="ts">
	import '../app.css';
	import favIcon from '$lib/assets/CodeballIcon-128.ico';
	import ogImage from '$lib/assets/github_bg.png';
	import { dev } from '$app/env';
	import { page } from '$app/stores';
	import type { Load } from '@sveltejs/kit';

	export let login: string | null;

	const header = [
		{ href: '/how', title: 'how' },
		{ href: '/pricing', title: 'pricing' },
		{ href: 'https://github.com/sturdy-dev/codeball-action', title: 'github action' },
		{ href: '/faq', title: 'faq' }
	];
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
		<header class="flex items-center gap-4 bg-stone-100 pb-4 font-mono text-black">
			<a class="pr-12 text-2xl" href="/">Codeball<sup class="text-red-700">beta</sup></a>
			{#each header as { href, title }}
				<a
					class:text-red-700={$page.url.pathname === href}
					class:font-semibold={$page.url.pathname === href}
					{href}>[{title}]</a
				>
			{/each}
			<div class="flex-1" />
			{#if login}
				<a
					class:text-red-700={$page.url.pathname === '/dashboard'}
					class:font-semibold={$page.url.pathname === '/dashboard'}
					href="/dashboard">[dashboard]</a
				>
			{/if}
		</header>

		<slot />
	</div>
</main>
