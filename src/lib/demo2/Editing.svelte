<script lang="ts">
	import { onMount } from 'svelte';

	export let text: string;
	$: lines = text.split('\n');

	let textarea: HTMLTextAreaElement;
	onMount(() => textarea.focus());
</script>

<div class="flex gap-4 overflow-hidden border-2 border-blue-500 font-mono outline-none ring">
	<div>
		{#each lines as _, i}
			<div class="w-12 flex-shrink-0 select-none px-2 text-right text-gray-800">
				{i + 1}
			</div>
		{/each}
	</div>
	<textarea
		bind:this={textarea}
		class="w-full bg-inherit focus-visible:outline-none"
		bind:value={text}
		rows={lines.length}
	/>
</div>
