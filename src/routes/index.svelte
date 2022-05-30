<script lang="ts">
	import { FakePulls, GitHubLoginButton, AnalyzeForm, Logos } from '$lib/components/index';
</script>

<article class="font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">AI-POWERED CODE REVIEW</h1>

	<div class="my-8 flex flex-col gap-16 lg:flex-row justify-between">
		<div class="flex flex-col gap-8">
			<p class="text-xl text-gray-500 sm:max-w-xl">
				Codeball approves Pull Requests that a human would have approved. Wait less for review, save time
				and $$$.
			</p>

			<div class="flex flex-col gap-2">
				<p class="text-md text-gray-500">Try it on your repo!</p>
				<AnalyzeForm />
			</div>

			<GitHubLoginButton showText={true} />

			<ul class="flex gap-2">
				<li>[<a href="/faq">faq</a>]</li>
				<li>[<a href="/how">how</a>]</li>
				<li>[<a href="https://github.com/sturdy-dev/codeball-action">github action</a>]</li>
			</ul>

			<Logos />
		</div>

		<div class="w-[24rem] lg:block hidden">
			<FakePulls />
		</div>
	</div>
</article>
