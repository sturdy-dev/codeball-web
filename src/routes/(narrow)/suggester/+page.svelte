<script lang="ts">
	import { Demo, examples, type Comment } from '$lib/demo';
	import Button from '$lib/Button.svelte';
	import Go from '$lib/icons/Go.svelte';
	import Java from '$lib/icons/Java.svelte';
	import JS from '$lib/icons/JS.svelte';
	import { browser } from '$app/environment';

	export let data;

	const options = [
		...examples,
		{
			file: {
				...examples[0].file,
				name: undefined
			},
			examples: []
		}
	];

	const delay =
		(timeout: number) =>
		(comment: Comment): Comment => {
			console.log(comment.author.name);
			return {
				...comment,
				text:
					comment.author.name === 'Codeball'
						? comment.text.then(
								(text) => new Promise((resolve) => setTimeout(() => resolve(text), timeout))
						  )
						: comment.text,
				replies: comment.replies.map(delay(timeout))
			};
		};

	$: if (browser) location.hash = selectedFile.file.name ?? 'custom';
	$: selectedFile = browser
		? options.find((o) =>
				o.file.name === undefined && location.hash.slice(1) === 'custom'
					? true
					: o.file.name === location.hash.slice(1)
		  ) ?? options[0]
		: options[0];
	$: selectedPrompt = selectedFile.examples[0] ?? [];
</script>

<article class="mb-32 font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">CODEBALL SUGGESTER</h1>
	<div class="flex flex-col justify-around lg:flex-row lg:space-x-4">
		<div class="space-y-4 lg:mt-32 lg:w-80">
			<p class="mb-16 text-xl text-gray-500 lg:mb-32">
				Codeball SUGGESTER turns code review comments on your Pull Request into code suggestions.
				Powered by OpenAI Codex.
			</p>

			<p>Want to see something cool?</p>

			<div>
				<div class="font-bold">Pick your language</div>
				<div class="flex space-x-4">
					{#each options.filter((o) => o.file) as option}
						{@const filename = option.file.name || ''}
						{@const ext = filename.slice(filename.lastIndexOf('.'))}
						{@const selected = selectedFile === option}
						<div
							on:click={() => (selectedFile = option)}
							class="duration-400 h-16 w-16 cursor-pointer p-2 text-white transition-all hover:bg-gray-700 hover:text-white"
							class:bg-black={selected}
							class:shadow-lg={selected}
							class:bg-gray-300={!selected}
						>
							{#if ext === '.go'}
								<Go />
							{:else if ext === '.java'}
								<Java />
							{:else if ext === '.js'}
								<JS />
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									role="img"
									viewBox="0 0 24 24"
									aria-hidden="true"
									fill="currentColor"
								>
									<text x="8" y="17">?</text>
								</svg>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div class="max-w-3xl">
				<div class="font-bold">Pick your comment</div>
				<div class="flex flex-col space-y-4">
					{#each selectedFile.examples as prompt}
						{@const selected = selectedPrompt === prompt}
						{@const text = prompt.find((c) => c.author.name !== 'Codeball')?.text}
						<div on:click={() => (selectedPrompt = prompt)}>
							<div
								class="duration-400 cursor-pointer p-2 text-white transition-all hover:bg-gray-700 hover:text-white"
								class:bg-black={selected}
								class:shadow-lg={selected}
								class:bg-gray-300={!selected}
							>
								{#await text then text}"{text}"{/await}
							</div>
						</div>
					{:else}
						<p>Try sending your own comments in the editor --></p>
					{/each}
				</div>
			</div>

			<div class="lg:pt-16">
				<p>Impressed?!</p>
				<Button href="/suggester-action">Install GitHub Action</Button>
			</div>
		</div>
		<Demo
			file={{ ...selectedFile.file, comments: selectedPrompt.map(delay(1000)) }}
			immutable={!!selectedFile.file.name}
			login={data.login}
		/>
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
				{#each [{ name: 'How does it work?', description: 'Codeball Suggester uses OpenAI Codex, a machine learning model to convert code review comments into suggestions that are ready to approve. It draws context from the your project and your codebase to write code following your format and style.' }, { name: 'What languages does it support?', description: 'Codeball Suggester supports Go, JavaScript, TypeScript, Python, PHP, Ruby, Java, and Shell.' }, { name: 'How does it run?', description: 'Codeball is triggered via GitHub Actions, and uses the Codeball API to generate suggestions.' }] as q}
					<div class="max-w-prose">
						<h3 class="text-xl text-gray-800">{q.name}</h3>
						<p class="text-md mt-1 text-gray-500">{q.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</article>
