<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball Epic Demo'
		}
	});
</script>

<script lang="ts">
	import Demo from '../lib/demo/Demo.svelte';
</script>

<article class="mb-32 space-y-16 font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">CODEBALL DRIVER</h1>

	<p class="text-xl text-gray-500 sm:max-w-xl">
		Codeball Driver writes code for you using GitHub Code Reviews. Powered by OpenAI Codex.
	</p>

	<Demo />
</article>
