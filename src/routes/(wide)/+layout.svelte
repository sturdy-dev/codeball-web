<script lang="ts">
	import '../../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;
</script>

<main class="min-h-screen w-full bg-orange-50">
	<Header login={data.login} />

	<slot />

	<Footer />
</main>
