<script lang="ts">
	import { BASE_URL } from '$lib/api';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';

	export let organization: string;
</script>

<form action={`${BASE_URL}/subscriptions`} method="POST">
	<input type="hidden" name="organization" value={organization} />
	<input type="hidden" name="success_url" value={$page.url.toString()} />
	<input type="hidden" name="cancel_url" value={$page.url.toString()} />
	<Button color="black">Upgrade to BALLER EDITION</Button>
</form>
