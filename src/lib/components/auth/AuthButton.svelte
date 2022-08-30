<script lang="ts">
	import gitHubLogo from '$lib/assets/GitHub-Mark-120px-plus.png?preset=logo';
	import Image from '$lib/components/Image.svelte';
	import Button from '$lib/Button.svelte';
	import { page } from '$app/stores';
</script>

<Button href={`/github/oauth?redirect=${encodeURIComponent($page.url.toString())}`} color="white">
	<span>Login with GitHub</span>
	<Image class="ml-1" src={gitHubLogo} alt="GitHub logo" />
</Button>
