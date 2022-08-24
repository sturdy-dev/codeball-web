<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Author } from './file';

	let isReplying = false;
	let reply = '';

	export let author: Author;

	const dispatch = createEventDispatcher();
	const onReplyCreated = () => {
		if (reply.length > 0) dispatch('reply', { text: reply });
		onClose();
	};

	const onClose = () => {
		reply = '';
		textarea.blur();
	};

	let textarea: HTMLTextAreaElement;
	const onKeydown = (e: KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') onReplyCreated();
		if (e.key == 'Escape') onClose();
	};
</script>

<svelte:body on:keydown={onKeydown} />

<div class="flex w-full gap-4 px-4 py-2">
	<img
		alt={author.name}
		src={author.avatarUrl ?? '/avatar-unknown.png'}
		class="h-6 w-6 rounded-full border-2"
	/>

	<form
		class="flex w-full flex-col items-end gap-2"
		on:submit|preventDefault={() => onReplyCreated()}
	>
		<textarea
			rows="1"
			class="w-full rounded-md border-2 border-gray-300 p-2 shadow-inner"
			placeholder="Reply..."
			on:focus={() => (isReplying = true)}
			on:blur={() => (isReplying = false)}
			bind:value={reply}
			bind:this={textarea}
		/>
		{#if isReplying}
			<button
				type="submit"
				class="flex w-20 justify-around rounded-md border-2 border-gray-600 bg-green-300 px-2 py-1 font-semibold"
				>send</button
			>
		{/if}
	</form>
</div>
