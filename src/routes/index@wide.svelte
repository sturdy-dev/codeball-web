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
	import { Logos, FeatureList, FeatureBox, Hero } from '$lib/components/index';
	import Button from '$lib/Button.svelte';

	import armadilloCoffee from '$lib/armadillo/coffee-2.png?preset=thumbnail&srcset';
	import armadilloPingPong from '$lib/armadillo/pingpong-2.png?preset=thumbnail&srcset';
	import armadilloTrackAndField from '$lib/armadillo/track-and-field.png?preset=thumbnail&srcset';
	import armadilloGraph from '$lib/armadillo/graph.png?preset=thumbnail&srcset';
	import armadilloAtTheComputerHD from '$lib/armadillo/at-the-computer-2.png?preset=hd&srcset';
	import CalendarDaysMini from '$lib/icons/CalendarDaysMini.svelte';
	import Animation from '../lib/components/index/scanner/Animation.svelte';

	export let login: string | null;
</script>

<Hero>
	<slot slot="left">
		<h1 class="text-5xl font-bold max-w-lg">
			Boost your engineering <span class="text-orange-600">velocity</span> and <span class="text-orange-600">reliability</span> with AI
		</h1>

		<ul class="flex flex-col gap-2 text-gray-800">
			<li class="inline-flex items-center gap-4">
				<div class="text-2xl">🧠️</div>
				<div class="font-medium">AI Code Review</div>
			</li>
			<li class="inline-flex items-center gap-4">
				<div class="text-2xl">☁️</div>
				<div class="font-medium">Runs on GitHub Actions</div>
			</li>
			<li class="inline-flex items-center gap-4">
				<div class="text-2xl">🏎</div>
				<div class="font-medium">No configuration needed</div>
			</li>
			<li class="inline-flex items-center gap-4">
				<div class="text-2xl">🧑‍💻️</div>
				<div class="font-medium">
					Supports Python, JS, TypeScript, Go, C++, Java, Ruby, and more...
				</div>
			</li>
		</ul>

		<div class="inline-flex items-center space-x-2">
			<Button color="orange" href="/approver" event="umami--click--index-get-started">Get started</Button>
			<Button color="violet" href="/approver" event="umami--click--try-the-demo">Try the demo</Button>
		</div>
		<div class="inline-flex space-x-2">
			<span>Need enterprise support?</span>
			<a
				class="inline-flex items-center space-x-1 text-orange-500 umami--click--schedule-a-call"
				href="https://calendly.com/kiril-videlov/30-min-codeball?month=2022-08"
			>
				<span> Schedule a call </span>
				<CalendarDaysMini />
			</a>
		</div>

		<Logos />
	</slot>
	<slot slot="right">
		<Animation />
	</slot>
</Hero>

<div class="flex w-full flex-col items-center overflow-hidden bg-orange-50 pt-16">
	<div class="flex w-full justify-around px-8">
		<div class="w-full max-w-7xl space-y-4 text-lg">
			<h1 class="text-5xl font-bold text-gray-800">
				Skip code review, Codeball approves your <span class="text-gray-400">(good)</span> PRs!
			</h1>
			<p class="max-w-3xl text-gray-600">
				Reading this as you're waiting for a review? We know the feeling.
				<br /><br />
				Codeball is an AI trained to review and approve Pull Requests. If Codeball sees that you're good
				to go, your PR will be approved – without having to wait for humans.
				<br /><br />
				Codeball has been trained to only act if it's confident,<br />
				and will not do anything (fallback to human review) when unsure.<br />
				It's a win-win!
			</p>
		</div>
	</div>
	<img
		class="select-none md:-mt-[6rem] lg:-mr-[44rem] lg:-mt-[16rem] xl:-mr-[32rem]"
		width="1024"
		height="914"
		srcset={armadilloAtTheComputerHD}
	/>
</div>

<FeatureList>
	<FeatureBox title="Codeball Approver" srcset={armadilloCoffee}>
		<slot slot="content">
			<p>
				Approver uses advanced Artificial Intelligence to grade Pull Requests, and will approve Pull
				Requests that it's really-really confident in. Approver can reduce the time your teams
				spends on waiting for review by over 60%.
			</p>
			<p>
				The Approver is easy to add to any GitHub repository, with a single click installation using
				GitHub Actions.
			</p>
		</slot>
		<div slot="action">
			<Button color="violet" href="/approver" event="umami--click--index-approver-set-up">Set up</Button>
		</div>
	</FeatureBox>

	<FeatureBox title="Codeball Suggester" srcset={armadilloPingPong} pill="BETA">
		<slot slot="content">
			<p>
				The Suggester is powered by OpenAI Codex and converts comment feedback in Code Review to
				actionable diff suggestions.
			</p>
			<p>
				The Suggester is easy to add to any GitHub repository, with a single click installation
				using GitHub Actions.
			</p>
		</slot>
		<div slot="action">
			<Button color="violet" href="/suggester" event="umami--click--index-suggester-go-to-demo">Go to demo</Button>
		</div>
	</FeatureBox>

	<FeatureBox title="Really fast, running on GitHub Actions" srcset={armadilloTrackAndField}>
		<slot slot="content">
			<p>
				All of our tools runs on GitHub Actions, making it easy as <strong>⌘+V</strong> to setup, and
				integrates nicely with your existing suite CI/CD, and gives you full configuration for how to
				integrate our tools into your stack.
			</p>
		</slot>
		<div slot="action">
			<Button color="violet" href="https://github.com/sturdy-dev/codeball-action" event="umami--click--runs-on-actions-set-up">Set up</Button>
		</div>
	</FeatureBox>

	<FeatureBox title="Not a dashboard" srcset={armadilloGraph}>
		<slot slot="content">
			<p>
				Collecting data and rendering a graph is easy &mdash; making you a better coder and
				developer is much harder. Tracking the DORA metrics? Codeball will improve your metrics from
				day one.
			</p>
		</slot>
		<div slot="action">
			<Button color="violet" href="/dora" event="umami--click--index-dora">Read more</Button>
		</div>
	</FeatureBox>
</FeatureList>

<div class="bg-black py-16 text-white">
	<div class="mx-auto max-w-7xl space-y-8 p-14 text-center">
		<h2 class="font-mono text-5xl font-bold">I'm ready</h2>
		<Button color="black" href="/approver" event="umami--click--index-ready-lets-go">Let's go!</Button>
	</div>
</div>
