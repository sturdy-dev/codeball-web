<script lang="ts">
	import gitHubLogo from '$lib/assets/GitHub-Mark-120px-plus.png?preset=logo';
	import Image from '$lib/components/Image.svelte';
	import Button from '$lib/Button.svelte';
	import { page } from '$app/stores';

	export let overrideRedirectPath: undefined | string;
	$: path = overrideRedirectPath ?? $page.url.toString();
</script>

<Button href={`/github/oauth?redirect=${encodeURIComponent(path)}`} color="white" event="umami--click--login-with-github">
	<span>Login with GitHub</span>
	<Image class="ml-1" src={gitHubLogo} alt="GitHub logo" />
</Button>
