<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball Suggester'
		}
	});
</script>

<script lang="ts">
	import Languages from '$lib/demo/Languages.svelte';
	import Prompts from '$lib/demo/Prompts.svelte';
	import Browser from '$lib/demo/Browser.svelte';
	import Button from '$lib/Button.svelte';

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

	const faq: Array<{ name: string; description: string }> = [
		{
			name: 'How does it work?',
			description:
				'Codeball Suggester uses a machine learning model to convert code review comments into suggestions that are ready to approve. It draws context from the your project and your codebase to write code following your format and style.'
		},
		{
			name: 'What languages does it support?',
			description:
				'Codeball Suggester supports Go, JavaScript, TypeScript, Python, PHP, Ruby, Java, and Shell.'
		},
		{
			name: 'How does it run?',
			description:
				'Codeball is triggered via GitHub Actions, and uses the Codeball API to generate suggestions.'
		}
	];
</script>

<article class="mb-32 font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">CODEBALL SUGGESTER</h1>

	<div class="flex flex-col justify-around lg:flex-row lg:space-x-4">
		<div class="space-y-4 lg:mt-32 lg:w-80">
			<p class="mb-16 text-xl text-gray-500 lg:mb-32">
				Codeball SUGGESTER turns code review comments on your Pull Request into code suggestions.
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

			<div class="lg:pt-16">
				<p>Impressed?!</p>
				<Button href="/suggester-action">Install GitHub Action</Button>
			</div>
		</div>

		<Browser file={pickedFile} {lines} />
	</div>

	<div class="mt-16">
		<p>
			P.S.: The suggestions on this page might be simulated, but they are from real examples. Just
			test it yourself ;)
		</p>
	</div>

	<div class="mt-16 flex items-center justify-center space-x-8">
		<div class="text-4xl lg:text-8xl">👉👉👉</div>
		<Button href="/suggester-action">Add to your repo</Button>
		<div class="text-4xl lg:text-8xl">👈👈👈</div>
	</div>

	<div class="mt-16 flex flex-col gap-16 lg:flex-row">
		<div class="flex flex-col gap-8">
			<p class="text-xl text-gray-500 sm:max-w-xl">Questions and some answers</p>

			<div class="flex flex-col gap-12">
				{#each faq as q}
					<div class="max-w-prose">
						<h3 class="text-xl text-gray-800">{q.name}</h3>
						<p class="text-md mt-1 text-gray-500">{@html q.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</article>
