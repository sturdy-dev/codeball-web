<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff }) => ({ props: { login: stuff.login } });
</script>

<script lang="ts">
	import { GitHubLoginButton } from '$lib/components/index';
	import { Demo, examples } from '$lib/demo2';

	export let login: string;
	const text = `package main

import (
    "fmt"
)

func main() {
    fmt.Println("Hello, World!")
}`;
</script>

{#if login}
	<Demo {text} {login} />
{:else}
	<div class="flex w-full flex-col items-center">
		<h2 class="font-mono">OpenAI requires us to identify end users, so please:</h2>
		<GitHubLoginButton {login} />
	</div>
{/if}
