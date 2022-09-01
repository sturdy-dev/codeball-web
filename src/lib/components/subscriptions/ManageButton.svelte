<script lang="ts">
	import { BASE_URL } from '$lib/api';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
</script>

<form action={`${BASE_URL}/subscriptions/manage`} method="GET">
	<input type="hidden" name="return_url" value={$page.url.toString()} />
	<Button color="black">Manage subscriptions</Button>
</form>
