<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff: { login } }) => ({
		props: { login: login ?? null },
		stuff: {
			showAnnouncementBanner: false
		}
	});
</script>

<script lang="ts">
	import { AnalyzeForm, Logos } from '$lib/components/index';
	import Button from '$lib/Button.svelte';
	import FeatureBox from '$lib/index/FeatureBox.svelte';

	export let login: string | null;
</script>

<div class="flex w-full flex-col items-center space-y-16 bg-rose-100">
	<div
		class="flex w-full max-w-7xl flex-col items-start justify-between gap-16 py-16 px-8 md:flex-row md:items-center"
	>
		<div class="flex flex-col gap-8">
			<h1 class="text-5xl font-bold">
				Increase<br />your<br />engineering<br /><span class="text-orange-600">velocity</span>
			</h1>

			<ul class="flex flex-col gap-2">
				<li class="inline-flex items-center gap-4">
					<div class="text-2xl">🧠️</div>
					<div>AI power suite</div>
				</li>
				<li class="inline-flex items-center gap-4">
					<div class="text-2xl">✅️</div>
					<div>Pre-Approves PRs</div>
				</li>
				<li class="inline-flex items-center gap-4">
					<div class="text-2xl">🏎</div>
					<div>No configuration needed</div>
				</li>
				<li class="inline-flex items-center gap-4">
					<div class="text-2xl">🧑‍💻️</div>
					<div>Supports Python, Go, C++, Java, and more</div>
				</li>
			</ul>

			<div>
				<Button href="#setup">Get started</Button>
			</div>
		</div>

		<div class="max-w-[30rem]">
			<Logos />
		</div>
	</div>
</div>

<div class="flex w-full flex-col items-center bg-rose-100 px-8 pt-16">
	<div
		style="background-position: bottom -6rem right -8rem;"
		class="flex w-full justify-around bg-no-repeat lg:h-[55rem] lg:bg-[url('/armadillo/big-office.png')]"
	>
		<div class="w-full max-w-7xl space-y-8">
			<h1 class="text-5xl font-bold">Codeball is your AI powered toolset</h1>
			<p class="max-w-3xl text-gray-600">
				Codeball uses AI to improve your engineering productivity from day 0. Using our own dataset
				of millions of merged Pull Requests and code contributions and OpenAI Codex, we've built
				some of the most powerful coding AIs in the world.
			</p>
			<p class="max-w-3xl text-gray-600">
				The Codeball AI will help your developers ship more quickly<br />and with higher confidence.
			</p>
		</div>
	</div>
	<img class="block lg:hidden" src="/armadillo/big-office.png" />
</div>

<div class="flex w-full flex-col items-center space-y-16 bg-white py-16">
	<FeatureBox title="Codeball Approver" img="/armadillo/coffee-transformed.png">
		<div slot="content">
			<p>
				Approver uses advanced Artificial Intelligence to grade Pull Requests, and will approve Pull
				Requests that it's confident in, so that you don't have to wait for review.
			</p>
			<p>The Approver is easy to add to any GitHub repository, with a single click installation.</p>
		</div>
		<div slot="action">
			<Button href="https://github.com/sturdy-dev/codeball-action">Add it</Button>
		</div>
	</FeatureBox>

	<FeatureBox title="Codeball Suggester" img="/armadillo/pingpong-transformed.png">
		<div slot="content">
			<p>
				The Suggester is powered by OpenAI Codex and converts comment feedback in Code Review to
				actionable diff suggestions.
			</p>
			<p>The Approver is easy to add to any GitHub repository, with a single click installation.</p>
		</div>
		<div slot="action">
			<Button href="/suggester">Show me</Button>
		</div>
	</FeatureBox>

	<FeatureBox title="Really fast, powered by GitHub Actions" img="/armadillo/track-and-field.png">
		<div slot="content">
			<p>
				Codeball runs on GitHub Actions, making it easy as <strong>⌘+V</strong> to setup, and integrates
				nicely with your existing suite CI/CD.
			</p>
		</div>
		<div slot="action">
			<Button href="https://github.com/sturdy-dev/codeball-action">Show me</Button>
		</div>
	</FeatureBox>

	<div class="flex w-4/5 flex-col items-center gap-4 p-8 py-16">
		<p class="font-mono">Test Codeball for yourself, with the Codeball web demo:</p>
		<div class="w-1/2">
			<AnalyzeForm />
		</div>
	</div>
</div>

<div class="bg-black pb-32 text-white">
	<div class="mx-auto max-w-7xl space-y-8 p-14 text-center">
		<h2 class="text-5xl font-bold">Let's go</h2>
		<Button>Show me how</Button>
	</div>
</div>
