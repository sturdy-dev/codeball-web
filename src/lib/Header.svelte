<script lang="ts">
	import { page } from '$app/stores';

	import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui';

	export let login: string | null;

	const header = [
		{ href: '/how', title: 'How' },
		{ href: '/pricing', title: 'Pricing' },
		{ href: 'https://github.com/sturdy-dev/codeball-action', title: 'GitHub Action' },
		{ href: '/faq', title: 'FAQ' },
		{ href: '/blog', title: 'Blog' }
	];
</script>

<div class="md:mx-auto md:max-w-7xl">
	<Popover class="" let:open>
		<header class="flex items-center justify-between gap-4 p-4 text-black md:flex-row">
			<div class="float-left flex h-full items-center gap-4 p-2 md:mr-12 md:p-0">
				<a href="/"
					><img
						width="49"
						height="48"
						class="h-8 w-8 md:h-12 md:w-12"
						src="/brand/ball/BallWithBrainRaster256.png"
					/>
				</a>
				<a class="text-2xl" href="/">Codeball</a>
			</div>

			<div class="grid hidden flex-1 grid-cols-2	gap-x-4	 md:block md:flex md:space-x-2 ">
				{#each header as { href, title }}
					<a
						class:text-red-700={$page.url.pathname === href}
						class:font-semibold={$page.url.pathname === href}
						class="whitespace-nowrap"
						{href}>{title}</a
					>
				{/each}

				<div class="flex-1" />

				{#if login}
					<a
						class:text-red-700={$page.url.pathname === '/dashboard'}
						class:font-semibold={$page.url.pathname === '/dashboard'}
						href="/dashboard">Dashboard</a
					>
				{:else}
					<a href={`/github/oauth`}>Login with GitHub</a>
				{/if}
			</div>

			<PopoverButton
				class="inline-flex items-center justify-center rounded-md p-2 text-2xl text-gray-400 md:hidden"
			>
				{open ? '✖️' : '🍔'}
			</PopoverButton>
		</header>

		<PopoverPanel class="box-shadow-lg absolute top-12 z-10 w-full transform p-4 md:hidden">
			<div class="rounded-xl bg-black p-4 pb-32 text-white drop-shadow-xl">
				<div class="grid grid-cols-2 gap-4">
					{#each header as { href, title }}
						<PopoverButton
							as="a"
							class="whitespace-nowrap rounded-md text-base font-medium hover:text-gray-50"
							{href}>{title}</PopoverButton
						>
					{/each}

					{#if login}
						<PopoverButton
							as="a"
							class="whitespace-nowrap rounded-md text-base font-medium hover:text-gray-50"
							href="/dashboard">Dashboard</PopoverButton
						>
					{:else}
						<PopoverButton as="a" href={`/github/oauth`}>Login with GitHub</PopoverButton>
					{/if}
				</div>
			</div>
		</PopoverPanel>
	</Popover>
</div>
