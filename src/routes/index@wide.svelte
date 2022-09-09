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
	import armadilloCoffeeHD from '$lib/armadillo/coffee-2-tight.png?preset=hd&srcset';
	import armadilloTrackAndField from '$lib/armadillo/track-and-field.png?preset=thumbnail&srcset';
	import armadilloGraph from '$lib/armadillo/graph.png?preset=thumbnail&srcset';
	import Animation from '../lib/components/index/scanner/Animation.svelte';

	export let login: string | null;
</script>

<Hero>
	<slot slot="left">
		<h1 class="max-w-2xl text-8xl font-bold tracking-tight">AI-powered code review</h1>

		<p class="max-w-lg font-light leading-relaxed text-gray-600">
			Codeball finds bugs in your Pull Requests, lets you ship faster and with higher confidence.
			The Codeball AI is trained on millions of code contributions to recognize risky code changes.
		</p>

		<div class="inline-flex items-center space-x-2">
			<Button color="white" href="/approver" event="umami--click--index-get-started">
				Get started
			</Button>
		</div>

		<div class="max-w-2xl">
			<Logos />
		</div>
	</slot>

	<slot slot="right">
        <div class="" >
            <img srcset={armadilloCoffeeHD} class="" />
        </div>
	</slot>
</Hero>

<div class="flex flex-col items-center gap-32 bg-white px-4 py-32 md:px-24">
	<div class="flex flex-col items-center gap-4 ">
		<div class="flex flex-col items-center">
			<h2 class="text-md uppercase text-gray-500">How it works</h2>
		</div>

		<span class="rounded-xl bg-orange-100 px-4 py-1 font-medium text-orange-800">Install</span>
		<div class="text-4xl font-extrabold text-slate-800">Add the Codeball GitHub Action</div>
		<p class="max-w-lg text-center font-light leading-relaxed text-slate-600">
			Codeball is setup and configured using GitHub Actions.<br />
			Add <code>`.github/workflows/codeball.yml`</code> to a repo, and you're ready to go!
		</p>
	</div>

	<div class="flex flex-col items-center gap-4 ">
		<span class="rounded-xl bg-orange-100 px-4 py-1 font-medium text-orange-800">Run</span>
		<div class="text-4xl font-extrabold text-slate-800">Codeball evaluates new Pull Requests</div>

		<p class="max-w-lg text-center font-light leading-relaxed text-slate-600">
			Codeball analyzes the Pull Request, and picks up hundreds of parameters to use as the input to
			the Codeball AI.
		</p>

		<Animation />

        <!-- To compensate for the absolute positioning in the Animation -->
		<div class="mt-[13rem]" />
	</div>

	<div class="flex flex-col items-center gap-4 ">
		<span class="rounded-xl bg-orange-100 px-4 py-1 font-medium text-orange-800">Know</span>
		<p class="max-w-lg text-center font-light leading-relaxed text-slate-600">
			Codeball notifies you about new problems and risks. Add labels, fail the tests, or add an
			approving review.
		</p>
		<span class="whitespace-nowrap rounded-xl bg-amber-100 px-2 py-0.5 text-amber-700">
			codeball:needs-careful-review
		</span>
		<span class="whitespace-nowrap rounded-xl bg-sky-100 px-2 py-0.5 text-sky-700 ">
			codeball:needs-review
		</span>
		<span class="whitespace-nowrap rounded-xl bg-green-100 px-2 py-0.5 text-green-700">
			codeball:approved
		</span>
	</div>

	<div class="flex flex-col items-center gap-4 ">
		<span class="rounded-xl bg-orange-100 px-4 py-1 font-medium text-orange-800">Configure</span>
		<div class="text-4xl font-extrabold text-slate-800">Configure Codeball to your needs</div>
		<p class="max-w-lg text-center font-light leading-relaxed text-slate-600">
			Auto-approve safe PRs or enforce extra review on the risky ones &mdash; You decide!
		</p>
	</div>
</div>

<div class="flex flex-col items-center gap-16 bg-orange-50 py-16">
	<div class="flex flex-col items-center gap-4 ">
		<h2 class="text-md uppercase text-gray-500">Supports them all</h2>
		<p class="max-w-lg text-center font-mono font-light leading-relaxed text-slate-600">
			Go, TypeScript, Java, HTML, C#, Ruby, C++, Rust, Python, JavaScript, Swift, CSS, and over 20
			more!
		</p>
	</div>

	<div class="inline-flex items-center space-x-2 ">
		<Button color="orange" href="/approver" event="umami--click--index-get-started">
			Get started
		</Button>

		<Button color="violet" href="/approver" event="umami--click--try-the-demo">Try the demo</Button>
	</div>

	<div class="flex w-full max-w-3xl flex-col justify-around gap-4 px-8 leading-relaxed ">
		<h2 class="text-5xl font-bold text-gray-800">
			Avoid reckless merging, Codeball identifies and labels risky PRs
		</h2>
		<p class=" text-gray-600 ">
			Codeball is an AI model trained on millions of code contributions to distinguish between safe
			and risky code changes. It augments your development process by risk scoring your Pull
			Requests. Ship faster and with fewer faults with actionable and team-specific code insights.
		</p>
	</div>

	<div class="flex w-full max-w-3xl flex-col justify-around gap-4 px-8 leading-relaxed ">
		<h2 class="max-w-3xl pt-16 text-5xl font-bold text-gray-800">
			Skip code review, Codeball approves your <span class="text-gray-400">(good)</span> PRs!
		</h2>
		<p class="max-w-3xl text-gray-600">
			Feeling confident and prioritising getting-shit-done? Setup Codeball to automatically approve
			good PRs, without having to wait for review.
		</p>
	</div>
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
			<Button color="violet" href="/approver" event="umami--click--index-approver-set-up">
				Set up
			</Button>
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
			<Button
				color="violet"
				href="https://github.com/sturdy-dev/codeball-action"
				event="umami--click--runs-on-actions-set-up"
				>Set up
			</Button>
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
		<Button color="black" href="/approver" event="umami--click--index-ready-lets-go">
			Let's go!
		</Button>
	</div>
</div>
