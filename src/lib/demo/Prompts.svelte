<script lang="js">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Prompt from './Prompt.svelte';

	function pickPrompt(id) {
		dispatch('pickedPrompt', { id });
	}

	export let selectedPrompt;
	export let prompts;
</script>

<div class="text-center font-bold">Pick your comment</div>
{#each prompts as prompt}
	<div on:click={() => pickPrompt(prompt.id)}>
		<Prompt selected={selectedPrompt === prompt.id}>
			"{prompt.text}"
		</Prompt>
	</div>
{/each}
