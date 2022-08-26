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

	export let login: string | null;
</script>

<article class="mb-32 flex w-full flex-col items-center space-y-16 bg-white">
	<div class="mt-24 flex flex-col items-center gap-8">
		<h1 class="text-center text-5xl font-normal tracking-tight">Develop faster with AI</h1>
		<p class="max-w-[40rem] text-xl text-gray-600">
			The Codeball suite approves your Pull Requests and helps you and your team to develop faster.
			Wait less for review, save time and money.
		</p>
		<div class="flex items-center gap-4">
			<Button href="#setup">Use Codeball</Button>
			<a href="#">Contact Sales &rarr;</a>
		</div>
	</div>

	<div class="flex justify-around">
		<div class="max-w-[50rem]">
			<Logos />
		</div>
	</div>

	<div>
		<div class="h-60 bg-blue-200 p-12">big image or something</div>
	</div>

	<div class="flex max-w-[40rem] flex-col items-center gap-8">
		<h1 class="text-3xl font-normal tracking-tight">
			Codeball <span class="text-green-600">Approver</span>
		</h1>
		<div class="prose">
			<p>
				Approver uses <strong>advanced Artificial Intelligence</strong> to grade Pull Requests, and
				will approve Pull Requests that it's <strong>extremely confident</strong> in, so that you don't
				have to wait for review.
			</p>
			<p>The Approver is easy to add to any GitHub repository, with a single click installation.</p>
		</div>
		<div class="flex w-full flex-col gap-2">
			<p class="text-md text-gray-500">Try it on your repo!</p>
			<AnalyzeForm />
		</div>
		<div>
			<Button href="https://github.com/sturdy-dev/codeball-action">Add the GitHub Action</Button>
		</div>
	</div>

	<div class="flex max-w-[40rem] flex-col items-center gap-8">
		<h1 class="text-3xl font-normal tracking-tight">
			Codeball <span class="text-orange-600">Suggester</span>
		</h1>
		<div class="prose">
			<p>
				The Suggester is powered by OpenAI Codex and converts comment feedback in Code Review to
				actionable diff suggestions.
			</p>
		</div>
		<div class="">
			<Button href="/suggester">Try the demo</Button>
		</div>
	</div>

	<div class="flex w-full justify-center bg-stone-700 py-16">
		<div class="flex max-w-[40rem] flex-col items-center gap-8 text-gray-200">
			<h1 class="text-3xl font-normal tracking-tight">Not a dashboard</h1>
			<p>
				Tracking the DORA metrics? Codeball will improve your metrics from day one, by drastically
				reducing the time your top performers are spending waiting for code approvals.
			</p>
		</div>

		<div class="flex flex-col gap-4">
			<div
				class="shadow-x rounded-xl bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4 md:h-80 "
			>
				<img
					alt="Graph of improved lead times after installing Codeball"
					src="./dora-lead-times.png"
					height="1080"
					width="1920"
					class="h-full w-full object-contain"
				/>
			</div>
			<div>
				<Button href="/dora">Learn more</Button>
			</div>
		</div>
	</div>
</article>
