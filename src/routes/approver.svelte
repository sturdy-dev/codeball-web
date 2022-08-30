<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff: { login } }) => ({
		stuff: { title: 'Codeball Approver' },
		props: { login }
	});
</script>

<script lang="ts">
	import { AnalyzeForm } from '$lib/components/index';
	import AuthButton from '$lib/components/auth/AuthButton.svelte';
	import Button from '$lib/Button.svelte';
	import Hero from '$lib/components/index/Hero.svelte';
	import FeatureList from '$lib/components/index/FeatureList.svelte';
	import FeatureBox from '$lib/components/index/FeatureBox.svelte';

	import armadilloThumbsUpHD from '$lib/armadillo/thumbs-up.png?preset=hd&srcset';
	import armadilloDataScientist from '$lib/armadillo/data-scientist.png?preset=thumbnail&srcset';
	import armadilloCoffee from '$lib/armadillo/coffee-2.png?preset=thumbnail&srcset';

	export let login: string | null;

	$: showDemoForm = clickedContinue || login;

	let clickedContinue = false;
	const onClickContinue = () => {
		clickedContinue = true;
	};
</script>

<article>
	<Hero>
		<slot slot="left">
			<h1 class="text-5xl font-bold">
				Codeball<br /><span class="text-orange-600">Approver</span>
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
					<div class="font-medium">Supports Python, JS, TypeScript, Go, C++, Java, and more...</div>
				</li>
			</ul>
		</slot>
		<slot slot="right">
			<img srcset={armadilloThumbsUpHD} height="448" width="448" />
		</slot>
	</Hero>

	<FeatureList>
		<FeatureBox title="Demo" srcset={armadilloDataScientist} showAction={!showDemoForm}>
			<slot slot="content">
				<p>
					Test Approver on your GitHub repository to see how it would have performed on your
					historical data.
				</p>
				<p>The demo is free, and works on both Private and Public GitHub repositories!</p>
				{#if showDemoForm}
					<AnalyzeForm />
				{/if}
			</slot>

			<slot slot="action">
				{#if !showDemoForm}
					<div class="flex flex-col items-center gap-5">
						<AuthButton />
						<span class="cursor-pointer text-violet-300" on:click={onClickContinue}>
							Continue logged out
						</span>
					</div>
				{/if}
			</slot>
		</FeatureBox>

		<FeatureBox title="Install on GitHub Actions" srcset={armadilloCoffee}>
			<slot slot="content">
				<p>Approver runs on your GitHub Actions</p>
				<p>
					The Approver is easy to add to any GitHub repository, with a single click installation
					using GitHub Actions.
				</p>
				<p>
					The Codeball Action works out of the box, is very customizable, and can integrate tightly
					with your existing configuration and setup.
				</p>
			</slot>
			<div slot="action">
				<Button color="violet" href="https://github.com/sturdy-dev/codeball-action"
					>Install the Action</Button
				>
			</div>
		</FeatureBox>
	</FeatureList>
</article>
