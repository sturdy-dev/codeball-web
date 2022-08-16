<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball Epic Demo'
		}
	});
</script>

<script lang="ts">
	import Languages from '$lib/demo/Languages.svelte';
	import Prompts from '$lib/demo/Prompts.svelte';
	import Waitlist from '$lib/demo/Waitlist.svelte';
	import Browser from '$lib/demo/Browser.svelte';

	import { prompts, files } from '$lib/demo/data';

	const comments = (fileName: string, promptID: number, line: number) => {
		const p = prompts.find((prompt) => prompt.id === promptID && prompt.file === fileName);
		if (!p) {
			return [];
		}

		let res = [];

		if (p.line === line) {
			res.push({
				username: 'FriendlyReviewer',
				text: p.text,
				isCodeball: false
			});
		}

		for (const d of p.diffs) {
			if (d.line === line) {
				res.push({
					username: 'Codeball',
					html: d.diff,
					isCodeball: true
				});
			}
		}

		return res;
	};

	let selectedPrompt = 3;
	let selectedFile = 'db.go';

	$: pickedPrompt = prompts.find((p) => p.id === selectedPrompt && selectedFile === p.file);
	$: pickedFile = files.find((f) => f.name === selectedFile);

	$: availablePrompts = prompts.filter((p) => p.file === pickedFile?.name);

	$: lines = pickedFile?.content.split('\n').map((u, i) => ({
		num: i + 1,
		text: u,
		comments: comments(selectedFile, selectedPrompt, i + 1)
	}));
</script>

<article class="mb-32 font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">CODEBALL DRIVER</h1>

	<div class="flex flex-col justify-around lg:flex-row lg:space-x-4">
		<div class="space-y-4 lg:mt-32 lg:w-80">
			<p class="mb-16 text-xl text-gray-500 lg:mb-32">
				Codeball Driver writes code for you using GitHub Code Reviews. Powered by OpenAI Codex.
			</p>

			<p>Want to see something cool?</p>

			<Languages {selectedFile} on:pickedLanguage={(e) => (selectedFile = e.detail.selectedFile)} />

			{#if availablePrompts.length > 0}
				<Prompts
					prompts={availablePrompts}
					{selectedPrompt}
					on:pickedPrompt={(e) => (selectedPrompt = e.detail.id)}
				/>
			{/if}

			{#if selectedPrompt}
				<Waitlist />
			{/if}
		</div>

		<Browser file={pickedFile} {lines} />
	</div>
</article>
