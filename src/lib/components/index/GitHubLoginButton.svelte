<script lang="ts">
	import gitHubLogo from '$lib/assets/GitHub-Mark-120px-plus.png?preset=logo';
	import Image from '$lib/components/Image.svelte';

	const githubAppName = import.meta.env.VITE_GITHUB_APP_NAME;

	export let showText: boolean = false;
	export let login: string | null;
</script>

<div class="text-gray-600">
	{#if login}
		<p>
			{#if showText}
				You are logged in as: {login}
			{/if}

			<span class="whitespace-nowrap">
				[<a
					class="text-gray-800 hover:text-black"
					href="https://github.com/apps/{githubAppName}/installations/new"
					>add/update access to repos</a
				>]</span
			>
		</p>
	{:else}
		<p>
			{#if showText}
				<span>Want to test a private repo?</span>
			{/if}

			<span class="whitespace-nowrap">
				[<a class="inline-flex items-center text-gray-800 hover:text-black" href={`/github/oauth`}>
					<span>Login with GitHub</span>
					<Image class="ml-1" src={gitHubLogo} alt="GitHub logo" />
				</a>]
			</span>
		</p>
	{/if}
</div>
