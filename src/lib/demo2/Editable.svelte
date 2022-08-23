<script lang="ts">
	import { fileFromString } from './file';

	import FileComponent from './File.svelte';
	import Editing from './Editing.svelte';

	export let text: string;

	let editing = false;

	let file = fileFromString(text);

	const onEditDoneClicked = () => {
		editing = !editing;
		file = fileFromString(text, file);
	};
</script>

<div class="flex flex-col items-end gap-2">
	<div
		class="flex w-20 justify-around rounded-md border-2 border-black bg-blue-100 px-2 py-1 font-semibold"
	>
		<label for="edit-checkbox">{editing ? 'done' : 'edit'}</label>
		<input
			hidden
			id="edit-checkbox"
			name="edit-checkbox"
			type="checkbox"
			on:click={() => onEditDoneClicked()}
		/>
	</div>

	<div class="w-full">
		{#if editing}
			<Editing bind:text />
		{:else}
			<FileComponent bind:file />
		{/if}
	</div>
</div>
