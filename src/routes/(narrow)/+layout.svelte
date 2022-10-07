<script lang="ts">
	import '../../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;
</script>

<main class="flex min-h-screen flex-col items-center bg-white">
	<div class="w-full max-w-7xl flex-shrink-0">
		<Header login={data.login} />
	</div>

	<div class="w-full max-w-7xl flex-1 p-4">
		<div class="bg-orange-50 border-orange-200 border-2 rounded-xl py-4 px-8 text-orange-800 mb-8">🟡 We're currently experiancing issues with the GitHub API. Some features might not work as expected. Contact support@codeball.ai for assistance.</div>
		<slot />
	</div>

	<div class="w-full bg-orange-50">
		<Footer />
	</div>
</main>
