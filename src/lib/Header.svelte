<script lang="ts">
	import { page } from '$app/stores';

	export let login: string | null;

	const header = [
		{ href: '/how', title: 'How' },
		{ href: '/pricing', title: 'Pricing' },
		{ href: 'https://github.com/sturdy-dev/codeball-action', title: 'GitHub Action' },
		{ href: '/faq', title: 'FAQ' },
		{ href: '/blog', title: 'Blog' }
	];
</script>

<div class="p-4 md:mx-auto md:max-w-7xl">
	<header
		class="flex flex-col items-center gap-4 border-b-2 border-gray-400 pb-4 text-black md:mb-0 md:h-12 md:flex-row md:border-b-0"
	>
		<div class="flex h-full items-center gap-4 p-2 md:mr-12 md:p-0">
			<a class="block h-8 text-2xl md:h-4/5" href="/"
				><img class="h-full" src="/brand/ball/BallWithBrainRaster256.png" /></a
			>
			<a class="text-2xl" href="/">Codeball</a>
		</div>
		<div class="grid flex-1	grid-cols-2	 gap-x-4 md:flex md:space-x-2 ">
			{#each header as { href, title }}
				<a
					class:text-red-700={$page.url.pathname === href}
					class:font-semibold={$page.url.pathname === href}
					class="whitespace-nowrap"
					{href}>{title}</a
				>
			{/each}

			<div class="hidden flex-1 md:block" />

			{#if login}
				<a
					class:text-red-700={$page.url.pathname === '/dashboard'}
					class:font-semibold={$page.url.pathname === '/dashboard'}
					href="/dashboard">Dashboard</a
				>
			{:else}
				<a href={`/github/oauth`}>Login</a>
			{/if}
		</div>
	</header>
</div>
