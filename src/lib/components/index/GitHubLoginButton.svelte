<script lang="ts">
	import { NotFoundError } from '$lib/api';
	import gitHubLogo from '$lib/assets/GitHub-Mark-120px-plus.png?preset=logo';
	import Image from '$lib/components/Image.svelte';
	import { get } from '$lib/github';

	let githubAppName = import.meta.env.VITE_GITHUB_APP_NAME;

	export let showText: Boolean = false;

	const getLogin = async (): Promise<string | undefined> =>
		get()
			.then(({ login }) => login)
			.catch((err) => {
				if (err instanceof NotFoundError) {
					return undefined;
				}
				throw err;
			});
</script>

<div class="text-gray-600">
	{#await getLogin() then login}
		{#if login}
			<p>
				{#if showText}
					You are logged in as: {login}
				{/if}

				[<a
					class="hover:text-black text-gray-800"
					href="https://github.com/apps/{githubAppName}/installations/new"
					>add/update access to repos</a
				>]
			</p>
		{:else}
			<p>
				{#if showText}
					<span>Want to test a private repo?</span>
				{/if}

				[<a class="hover:text-black text-gray-800 inline-flex items-center" href={`/github/oauth`}>
					<span>Login with GitHub</span>
					<Image class="ml-1" src={gitHubLogo} alt="GitHub logo" />
				</a>]
			</p>
		{/if}
	{/await}
</div>
