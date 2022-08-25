<script lang="ts">
	import { fileFromString, fileToString, type File } from './file';

	import FileComponent from './File.svelte';
	import Editing from './Editing.svelte';
	import GitHubLoginButton from '$lib/components/index/GitHubLoginButton.svelte';

	export let immutable = false;
	export let login: string | null;
	export let file: File;

	const author = { name: login ?? 'FreiendlyReviewer' };

	let editing = false;
	let text = fileToString(file);

	const onEditDoneClicked = () => {
		editing = !editing;
		file = fileFromString(text, file);
	};
</script>

<div class="mt-16 flex-1 border-black lg:mt-0 lg:border-2  lg:shadow-lg">
	<div class="flex hidden space-x-2 border-b-2 border-black p-4 lg:block">
		<div class="space-y-2">
			<div class="flex space-x-2">
				<div class="h-3 w-3 rounded-full bg-red-600" />
				<div class="h-3 w-3 rounded-full bg-yellow-600" />
				<div class="h-3 w-3 rounded-full bg-green-600" />
			</div>
			<div class="flex items-center space-x-2">
				<div class="text-2xl">&larr;</div>
				<div class="text-2xl">&rarr;</div>
				<div class="text-2xl">🏠</div>
				<div class="px-2">https://codehub.com/FancyStartup/EpicProject/pulls/1337</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-4 lg:p-4">
		<div class="flex items-end">
			<div class="flex-1">
				<div class="text-4xl">
					<span class="text-black">Adding code</span>
					<span class="text-gray-800">#1337</span>
				</div>
				<div class="flex items-center space-x-2">
					<div class="test-green-700 rounded-xl bg-green-200 px-4 py-1">Open</div>
					<div>
						HappyCoder wants to merge <code class="text-blue-800">more-stuff</code> into
						<code class="text-blue-800">main</code>
					</div>
				</div>
			</div>

			{#if !immutable}
				<div
					class="flex justify-around rounded-md border-2 border-black bg-blue-100 px-2 py-1 font-semibold cursor-pointer"
				>
					<label for="edit-checkbox">{editing ? 'done' : 'edit code'}</label>
					<input
						hidden
						id="edit-checkbox"
						name="edit-checkbox"
						type="checkbox"
						on:click={() => onEditDoneClicked()}
					/>
				</div>
			{/if}
		</div>

		<div class="overflow-hidden rounded-lg border-2 border-gray-300">
			{#if file.name}
				<div class="border-b-2 border-gray-400 bg-gray-200 py-2  px-4 font-mono">
					{file.name}
				</div>
			{/if}
			<div class="w-full">
				{#if !login && !immutable}
					<div class="flex h-full w-full flex-col items-center">
						<h2 class="font-mono">OpenAI requires us to identify end users, so please:</h2>
						<GitHubLoginButton {login} />
					</div>
				{:else if editing}
					<Editing bind:text />
				{:else}
					<FileComponent bind:file {author} {immutable} />
				{/if}
			</div>
		</div>
	</div>
</div>
