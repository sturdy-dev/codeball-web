<script lang="ts">
	import { page } from '$app/stores';

	export let login: string | null;

	const footer = [
		{ href: '/how', title: 'How' },
		{ href: '/pricing', title: 'Pricing' },
		{ href: 'https://github.com/sturdy-dev/codeball-action', title: 'GitHub Action' },
		{ href: '/faq', title: 'FAQ' },
		{ href: '/blog', title: 'Blog' },
		{ href: 'https://discord.gg/fQcH9QAVpX', title: 'Discord' },
		{ href: 'mailto:support@codeball.ai', title: 'Email us' }
	];
</script>

<div class="p-4 md:mx-auto md:max-w-7xl">
	<footer class="py-4">
		<div class="flex flex-col items-center justify-around gap-2 md:flex-row md:gap-8">
			<div class="text-lg text-emerald-500">Made with 🥑 in Stockholm</div>
			<div class="md:flex-1" />
			{#each footer as { href, title }}
				<a
					class:text-red-700={$page.url.pathname === href}
					class:font-semibold={$page.url.pathname === href}
					class="whitespace-nowrap text-gray-700"
					{href}>{title}</a
				>
			{/each}
		</div>
	</footer>
</div>
