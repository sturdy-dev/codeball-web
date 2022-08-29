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
	import { AnalyzeForm, Logos, GitHubLoginButton } from '$lib/components/index';
	import Button from '$lib/Button.svelte';
	import FeatureBox from '$lib/index/FeatureBox.svelte';

	export let login: string | null;
</script>

<div class="flex w-full flex-col items-center space-y-16 bg-orange-50">
	<div
		class="flex w-full max-w-7xl flex-col items-start justify-between gap-16 py-16 px-8 md:flex-row md:items-center"
	>
		<div class="flex flex-col gap-8">
			<h1 class="text-5xl font-bold">
				Increase<br />your<br />engineering<br /><span class="text-orange-600">velocity</span>
			</h1>

			<ul class="flex flex-col gap-2 text-gray-800">
				<li class="inline-flex items-center gap-4">
					<div class="text-2xl">🧠️</div>
					<div>GitHub Actions AI power suite</div>
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
					<div>Supports Python, JS, TypeScript, Go, C++, Java, and more...</div>
				</li>
			</ul>

			<div class="space-x-2">
				<Button color="violet" href="https://github.com/sturdy-dev/codeball-action">
					Get started
				</Button>
				<Button color="lime" href="/approver">Try the demo</Button>
			</div>
		</div>

		<div class="max-w-[30rem]">
			<img src="/armadillo/at-the-computer-2.png" />
			<Logos />
		</div>
	</div>
</div>

<div class="flex w-full flex-col items-center overflow-hidden bg-oragne-50 pt-16">
	<div class="flex w-full justify-around px-8">
		<div class="w-full max-w-7xl space-y-4 text-lg">
			<h1 class="text-5xl font-bold text-gray-800">Codeball is your AI powered coding toolset</h1>
			<p class="max-w-3xl text-gray-600">
				Codeball uses AI to improve your Engineering Productivity from Day-0. Using our own dataset
				of millions of merged Pull Requests and code contributions, and OpenAI Codex, we've built a
				rock-solid AI toolset.
			</p>
			<p class="max-w-3xl text-gray-600">
				The Codeball AI will help your developers ship more quickly<br />and with higher confidence.
			</p>
		</div>
	</div>
	<img
		class="md:-mt-[6rem] lg:-mr-[44rem] lg:-mt-[16rem] xl:-mr-[32rem]"
		src="/armadillo/big-office.png"
	/>
</div>

<div class="flex  w-full flex-col items-center bg-white">
	<div
		class="flex w-full max-w-7xl flex-col items-center space-y-4 py-16 px-4 md:space-y-16 md:px-8"
	>
		<FeatureBox title="Codeball Approver" img="/armadillo/coffee-2.png">
			<slot slot="content">
				<p>
					Approver uses advanced Artificial Intelligence to grade Pull Requests, and will approve
					Pull Requests that it's confident in, so that you don't have to wait for review.
				</p>
				<p>
					The Approver is easy to add to any GitHub repository, with a single click installation.
				</p>
			</slot>
			<div slot="action">
				<Button color="violet" href="https://github.com/sturdy-dev/codeball-action">Add it</Button>
			</div>
		</FeatureBox>

		<FeatureBox title="Codeball Suggester" img="/armadillo/pingpong-2.png">
			<slot slot="content">
				<p>
					The Suggester is powered by OpenAI Codex and converts comment feedback in Code Review to
					actionable diff suggestions.
				</p>
				<p>
					The Approver is easy to add to any GitHub repository, with a single click installation.
				</p>
			</slot>
			<div slot="action">
				<Button color="violet" href="/suggester">Show me</Button>
			</div>
		</FeatureBox>

		<FeatureBox title="Really fast, powered by GitHub Actions" img="/armadillo/track-and-field.png">
			<slot slot="content">
				<p>
					Codeball runs on GitHub Actions, making it easy as <strong>⌘+V</strong> to setup, and integrates
					nicely with your existing suite CI/CD.
				</p>
			</slot>
			<div slot="action">
				<Button color="violet" href="https://github.com/sturdy-dev/codeball-action">Set up</Button>
			</div>
		</FeatureBox>

		<FeatureBox title="Not a dashboard" img="/armadillo/graph.png">
			<slot slot="content">
				<p>
					Collecting data and rendering a graph is easy &mdash; making you a better coder and
					developer is much harder. Tracking the DORA metrics? Codeball will improve your metrics
					from day one.
				</p>
			</slot>
			<div slot="action">
				<Button color="violet" href="/dora">Read more</Button>
			</div>
		</FeatureBox>

		<div class="flex w-full flex-col items-center gap-4 p-8 py-16 font-mono">
			<p>Test Codeball for yourself, with the Codeball web demo</p>
			<div class="w-full lg:w-1/2">
				<AnalyzeForm />
			</div>
			<GitHubLoginButton showText={true} {login} />
		</div>
	</div>
</div>

<div class="bg-black py-16 text-white">
	<div class="mx-auto max-w-7xl space-y-8 p-14 text-center">
		<h2 class="font-mono text-5xl font-bold">I'm ready</h2>
		<Button color="black" href="https://github.com/sturdy-dev/codeball-action">Let's go!</Button>
	</div>
</div>
