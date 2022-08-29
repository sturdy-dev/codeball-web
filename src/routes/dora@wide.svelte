<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball – Actually improve your DORA metrics '
		}
	});
</script>

<script lang="ts">
	import Button from '$lib/Button.svelte';

	import { FeatureList, BigFeatureBox, FeatureBox, Hero } from '$lib/components/index';
</script>

<Hero>
	<slot slot="left">
		<h1 class="text-5xl font-bold">
			Improve<br />your<br /><span class="text-orange-600">DORA</span><br />metrics
		</h1>

		<ul class="flex flex-col gap-2 text-gray-800">
			<li class="inline-flex items-center gap-4">
				<div class="text-2xl">⏱</div>
				<div class="font-medium">Change Lead Time</div>
			</li>
			<li class="inline-flex items-center gap-4">
				<div class="text-2xl">🏎</div>
				<div class="font-medium">Deployment Frequency</div>
			</li>
			<li class="inline-flex items-center gap-4">
				<div class="text-2xl">💥</div>
				<div class="font-medium">Change Failure Rate</div>
			</li>
			<li class="inline-flex items-center gap-4">
				<div class="text-2xl">🔧️</div>
				<div class="font-medium">Mean Time To Recovery</div>
			</li>
		</ul>
	</slot>

	<slot slot="right">
		<img src="/armadillo/graph.png" />
	</slot>
</Hero>

<FeatureList>
	<BigFeatureBox title="DORA Metrics" img="/armadillo/data-scientist.png" reverse={true}>
		<slot slot="content">
			<p>
				Engineering teams love to track their DORA metrics (<a
					class="underline"
					href="https://www.devops-research.com/research.html">DevOps Research and Assessment</a
				>), to get data on how well their team is doing, and to help deliver software faster. The
				for metrics are:
			</p>

			<ul class="clear-both list-inside list-disc">
				<li><strong>Change Lead Time</strong></li>
				<li><strong>Deployment Frequency</strong></li>
				<li><strong>Change Failure Rate</strong></li>
				<li><strong>Mean Time To Recovery</strong></li>
			</ul>
		</slot>
	</BigFeatureBox>

	<BigFeatureBox title="Not a dashboard" img="/armadillo/plug.png">
		<slot slot="content">
			<p>
				There are many companies that will sell you dashboards, but not doing much to <em
					>actually</em
				>
				help you improve. Codeball is a
				<strong>plug-and-play AI that automatically improves your stats</strong> – from day one!
			</p>
		</slot>
	</BigFeatureBox>

	<BigFeatureBox title="Using AI" img="/dora-lead-times.png" rainbow={true} reverse={true}>
		<slot slot="content">
			<p>
				The Codeball AI has been trained to behave like a human would <span class="text-gray-400"
					>(except it's fast, doesn't get sick, and is never stuck in a meeting)</span
				>.
			</p>

			<p>
				Add Codeball to your workflow to automatically improve your <strong>Change Lead Time</strong
				>, by automating Code Review, without sacrificing security.
			</p>

			<p>
				Codeball only approves <strong>safe</strong> contributions, and leaves the trickier ones for
				you to review. You'll review the trickier PRs yourself, just like before, but without getting
				annoyed by the noise of the easier PRs.
			</p>
		</slot>
	</BigFeatureBox>

	<FeatureBox title="Start Now" img="/armadillo/coffee-2.png">
		<slot slot="content">
			<p>
				Get started with Codeball for free today <span class="text-gray-400"
					>(30-day free trial, no credit card required)</span
				>. After 30 days, you'll only have to pay if Codeball is saving you time.
			</p>
		</slot>
		<div slot="action">
			<Button color="violet" href="https://github.com/sturdy-dev/codeball-action"
				>Add the Action
			</Button>
		</div>
	</FeatureBox>
</FeatureList>
