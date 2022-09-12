<script lang="ts">
	import { page } from '$app/stores';

	import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui';
	import Button from './Button.svelte';
	import AuthButton from './components/auth/AuthButton.svelte';

	export let login: string | null;

	const header = [
		{ href: '/how', title: 'How' },
		{ href: '/pricing', title: 'Pricing' },
		{
			href: 'https://github.com/sturdy-dev/codeball-action',
			title: 'GitHub Action',
			event: 'umami--click--github-action'
		},
		{ href: '/faq', title: 'FAQ' },
		{ href: '/blog', title: 'Blog' }
	];
</script>

<div class="md:mx-auto md:max-w-7xl">
	<Popover class="" let:open>
		<header class="flex items-center justify-between gap-6 p-4 text-black md:flex-row">
			<div class="inline-flex gap-1">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-400"
				>
					<span class="text-xl">🧠</span>
				</div>
				<a class="text-2xl font-normal tracking-tight text-orange-400" href="/">Codeball</a>
			</div>

			<div class="grid hidden flex-1 grid-cols-2	items-center gap-x-6 md:block md:flex">
				{#each header as { href, title, event }}
					<a
						class:text-red-700={$page.url.pathname === href}
						class:font-semibold={$page.url.pathname === href}
						class="whitespace-nowrap {event ?? ''}"
						{href}>{title}</a
					>
				{/each}

				<div class="flex-1" />

				{#if login}
					<Button color="white" href="/dashboard">Dashboard</Button>
				{:else}
					<AuthButton overrideRedirectPath="/dashboard" />
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
					{#each header as { href, title, event }}
						<PopoverButton
							as="a"
							class="whitespace-nowrap rounded-md text-base font-medium hover:text-gray-50 {event ??
								''}"
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
