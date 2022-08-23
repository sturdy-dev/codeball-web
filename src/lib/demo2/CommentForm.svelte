<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	let text = '';

	const dispatch = createEventDispatcher();

	const onClose = () => dispatch('close');
	const onCreate = () => dispatch('create', { text });
	const onKeydown = (e: KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') onCreate();
		if (e.key == 'Escape') onClose();
	};

	let textarea: HTMLTextAreaElement;
	onMount(() => textarea.focus());
</script>

<svelte:body on:keydown={onKeydown} />

<form class="flex w-full flex-col items-end gap-2 p-4" on:submit|preventDefault={() => onCreate()}>
	<textarea
		bind:this={textarea}
		rows="3"
		name="text"
		class="w-full rounded-md border-2 border-gray-300 p-2 shadow-inner"
		bind:value={text}
		placeholder="Add comment..."
	/>
	<div class="flex gap-1">
		<button
			on:click={() => onClose()}
			class="flex w-20 justify-around rounded-md border-2 border-gray-600 bg-gray-300 px-2 py-1 font-semibold"
			>cancel</button
		>
		<button
			type="submit"
			class="flex w-20 justify-around rounded-md border-2 border-gray-600 bg-green-300 px-2 py-1 font-semibold"
			>send</button
		>
	</div>
</form>
