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

<div>
	<div class="font-bold">Pick your comment</div>
	<div class="flex flex-col space-y-4">
		{#each prompts as prompt}
			<div on:click={() => pickPrompt(prompt.id)}>
				<Prompt selected={selectedPrompt === prompt.id}>
					"{prompt.text}"
				</Prompt>
			</div>
		{/each}
	</div>
</div>
