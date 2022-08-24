<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'OpenAI Codex TodoMVC Challenge'
		}
	});
</script>

<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Step from '$lib/blog/todo/Step.svelte';
	import ReadMore from '$lib/blog/ReadMore.svelte';

	import App0 from '$lib/blog/todo/steps/app_0.py?raw';
	import App1 from '$lib/blog/todo/steps/app_1.py?raw';
	import App2 from '$lib/blog/todo/steps/app_2.py?raw';
	import App3 from '$lib/blog/todo/steps/app_3.py?raw';
	import App4 from '$lib/blog/todo/steps/app_4.py?raw';
	import App5 from '$lib/blog/todo/steps/app_5.py?raw';
	import App6 from '$lib/blog/todo/steps/app_6.py?raw';
	import App7 from '$lib/blog/todo/steps/app_7.py?raw';
	import App8 from '$lib/blog/todo/steps/app_8.py?raw';
	import App9 from '$lib/blog/todo/steps/app_9.py?raw';

	const steps = [
		{
			prompt: 'Create a hello world flask webserver',
			code: App0,
			comment: `Let's get started! In my first attempt I used "python" instead of "flask" in the prompt. The code worked, but was too low level, and I could sense that it would get complicated too fast.<br><br>So I changed the prompt to "flask", and off we went! I'm no Flask expert, but this looks good to me.<br><br>Codex does not help me install dependencies, but I was able to get started with <code>pip3 install flask</code>. <br><br>If you're interested, the server is up and running <a href="https://codeball-mvc.fly.dev/" class="text-gray-800 font-medium">here</a>.`,
			addedLines: []
		},
		{
			prompt: 'Add a /tasks endpoint listing all tasks in a sqlite database',
			code: App1,
			addedLines: [2, 10, 11, 12, 13, 14, 15, 16],
			comment: `A Hello World might be cool and all, but it's time to write some <i>real</i> code.<br><br>Codex adds the endpoint correctly, LGTM! The file or prompt has no previous mention of sqlite or table names, so Codex makes something up for us, so far so good!`
		},

		{
			prompt:
				'before_first_request: Make sure that the tasks table exists (id auto incremental id, description text, done bool)',
			comment: `The tasks.db database does not exist yet, and has no tables.<br><br>Let's create a table structure, and ask Codex to set it up if it does not exist.<br><br>This took some tweaking to get right: prompts like "<code>setup ... before the app starts</code>" writes code, but it does not work and is not hooked up to Flask in any way.<br><br>Adding the keyword <code>before_first_request</code> fixes it and Codex does the right thing!`,
			code: App2,
			addedLines: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
		},
		{
			prompt: 'Update the tasks() method to return tasks as objects',
			code: App3,
			addedLines: [28, 29, 30, 31, 32, 33, 34, 35],
			comment: `Let's make the /tasks endpoint easier to consume (it's currently returning a list of lists), return as a list of objects.`
		},
		{
			prompt: 'Add a /add endpoint that inserts new entries to the tasks table.',
			comment: `There is no CRUD without the C!<br><br>Looks good, but beware: sometimes Codex writes code vulnerable to SQL injection. When that happens tough, I was able to prevent it by adding "safely" to the prompt.`,
			code: App4,
			addedLines: [37, 38, 39, 40, 41, 42, 43, 44, 45]
		},
		{
			prompt: 'Add a /update endpoint that updates task descriptions and done status',
			comment: `Codex is on a streak, this works nicely!<br><br>I think that we have everything we need to run our app now, let's deploy it!`,
			code: App5,
			addedLines: [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
		},
		{
			prompt: 'Add CORS headers to allow connections from any host',
			comment: `Uuuuh! Our friend CORS showed up and stopped us from enjoying getting everything on the first try. We need to add a CORS handler.<br><br>After this, the app was up and running with no problems!`,
			code: App6,
			addedLines: [2, 6]
		},
		{
			prompt: 'Update the add() method to return the id of the task created',
			comment: `The response from /add was a bit simple, and to improve the frontend (that I developer manually at this stage), it was nice to have the ID of the task in the response.`,
			code: App7,
			addedLines: [47]
		},
		{
			prompt: 'Format',
			comment: `This step is just for fun, and with a simple "Format" prompt, the code was formatted to be compliant with PEP 8!<br><br>Brb while I run: <code>pip uninstall black && pip install codex-formatter</code>`,
			code: App8,
			addedLines: [8, 21, 41, 53, 67]
		},
		{
			prompt:
				'before_first_request: After creating the table, if the table is empty, add three rows',
			comment: `To make [<a href="https://todo.codeball.ai/" class="text-gray-800">the demo</a>] nicer to look at, let's add some example data!<br><br>I can sense that Codex is getting annoyed with me, and asks me to learn Python by myself! <span class="text-2xl">😬</span>`,
			code: App9,
			addedLines: [19, 20, 21, 22, 23, 24, 25, 26, 27]
		}
	];
</script>

<div class="prose mb-4">
	<h1>Building a backend from scratch using only OpenAI Codex</h1>

	<div class="flex flex-row items-center gap-4">
		<img src="/avatars/gustav.jpeg" class="w-10 rounded-full" />
		<div class="flex flex-col text-xs">
			<div>Gustav Westling</div>
			<div>August 24th, 2022</div>
		</div>
	</div>

	<p>
		In the last few weeks, I and the rest of our team have been playing around a lot with OpenAI's
		Codex Model, as we've incorporated it into our latest feature (<a href="/suggester">
			the suggester</a
		>), and we've been generally impressed by it's performance.
	</p>

	<p class="border-l-4 border-blue-600 py-2 pl-4">
		"OpenAI Codex is an artificial intelligence model developed by OpenAI. It parses natural
		language and generates code in response. It is used to power GitHub Copilot, a programming
		autocompletion tool developed for Visual Studio Code. Codex is a descendant of OpenAI's GPT-3
		model, fine-tuned for use in programming applications."
	</p>

	<p>
		I had the idea of a challenge for myself: Create something useful, from scratch, using only
		Codex.
	</p>

	<p>
		My goal was to create a backend for a TodoMVC-style app. In our case, it will be a backend for a
		tasklist with tasks that can be added, listed, and marked as completed. The frontend is to be
		built manually (in SvelteKit).
	</p>

	<div class="inline-flex flex-col items-center">
		<img src="/todo-mvc.png" class="rounded-lg shadow-lg" />
		<i>Screenshot of the final application, once completed</i>
	</div>

	<p>
		First, I tried to create the backend in Go, but Codex continuously messed up the syntax when
		inserting new code, and usually ended up adding a new function withing another one (syntax
		error!)
	</p>
	<p>
		I switched strategy, and attempted to generate a Python app instead, and it worked great. The
		continuation of this blog post is a series of prompts used, together with comments about what
		worked and what didn't end up working out.
	</p>

	<p>
		I ended up using the "Codex" in the <a href="https://openai.com/blog/gpt-3-edit-insert/"
			>"edit" mode</a
		> as it makes the prompt design easier. The edit mode takes two inputs, a file and a instruction/prompt,
		and spits out a new version of the input file. For the input file, I started with an empty file,
		and for later prompts the output of the previous step was used.
	</p>

	<p>Here we go! First prompt:</p>
</div>

<div class="relative space-y-16 p-4 lg:space-y-32">
	{#each steps as step}
		<Step prompt={step.prompt} code={step.code} added={step.addedLines} comment={step.comment} />
	{/each}
</div>

<div class="prose">
	<p>
		That's it, our backend is done! You can check it out, and use the frontend at <a
			href="https://todo.codeball.ai/">todo.codeball.ai</a
		>.
	</p>
	<p>
		Developing with Codex is a bit special, and it sometimes takes a few attempts to get it to write <i
			>exactly</i
		>
		what you want it to. But in broad strokes, getting from nothing to <i>something</i> in just
		<strong>10 prompts</strong> is really impressive and encouraging.
	</p>
	<p>
		Codex continues to amaze me, and I'm sure that this task could be done in fewer steps (maybe
		even one?) with some <i>prompt engineering</i>. I'd like to start a <strong>prompt golf</strong>
		challenge! If you have access to Codex, can you re-create this backend in fewer steps? As few characters
		as possible?
	</p>
	<p>
		Would be cool to see how far we can take this, looking forward to hear in the comments on <a
			href="https://news.ycombinator.com/item?id=32577624">Hacker News</a
		>.
	</p>
</div>

<div class="mt-4">
	[<a href="https://github.com/sturdy-dev/codeball-todo-mvc">sources</a>] [<a
		href="https://todo.codeball.ai/">demo</a
	>]
</div>

<div class="mb-16" />

<Button href="/">HIRE A BOT</Button>

<ReadMore />
