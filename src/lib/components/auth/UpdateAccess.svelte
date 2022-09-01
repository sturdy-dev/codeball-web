<script lang="ts">
	import Button from '$lib/Button.svelte';
	const githubAppName = import.meta.env.VITE_GITHUB_APP_NAME;
</script>

<Button href="https://github.com/apps/{githubAppName}/installations/new" color="white">
	<span>Add/update access to repositories</span>
</Button>
