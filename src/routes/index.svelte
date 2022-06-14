<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff: { login } }) => ({
		props: { login: login ?? null }
	});
</script>

<script lang="ts">
	import { FakePulls, GitHubLoginButton, AnalyzeForm, Logos } from '$lib/components/index';
	import { dev } from '$app/env';

	export let login: string | null;
</script>

<article class="font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">AI-POWERED CODE REVIEW</h1>

	<div class="my-8 flex flex-col justify-between gap-16 lg:flex-row">
		<div class="flex flex-col gap-8">
			<p class="text-xl text-gray-500 sm:max-w-xl">
				Codeball approves Pull Requests that a human would have approved. Wait less for review, save
				time and money.
			</p>

			<div class="flex flex-col gap-2">
				<p class="text-md text-gray-500">Try it on your repo!</p>
				<AnalyzeForm />
			</div>

			<GitHubLoginButton showText={true} {login} />

			<Logos />

			<div class="flex flex-col items-center gap-4 md:flex-row">
				<a
					href="https://www.producthunt.com/posts/codeball?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-codeball"
					target="_blank"
					><img
						src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=349391&theme=neutral"
						alt="Codeball - AI&#0032;code&#0032;review&#0044;&#0032;wait&#0032;less&#0032;for&#0032;review&#0044;&#0032;save&#0032;time&#0032;and&#0032;money | Product Hunt"
						style="width: 250px; height: 54px;"
						width="250"
						height="54"
					/></a
				>

				<iframe
					src="https://ghbtns.com/github-btn.html?user=sturdy-dev&repo=codeball-action&type=star&count=true&size=large"
					frameborder="0"
					scrolling="0"
					width="170"
					height="30"
					title="Star codeball-action on GitHub"
				/>
			</div>
		</div>

		<div class="hidden w-[24rem] lg:block">
			<FakePulls />
		</div>
	</div>

	{#if !dev}
		<script>
			(function (d, t) {
				var BASE_URL = 'https://app.chatwoot.com';
				var g = d.createElement(t),
					s = d.getElementsByTagName(t)[0];
				g.src = BASE_URL + '/packs/js/sdk.js';
				g.defer = true;
				g.async = true;
				s.parentNode.insertBefore(g, s);
				g.onload = function () {
					window.chatwootSDK.run({
						websiteToken: 'K3JiuwomLthD1Q7T6bt7emch',
						baseUrl: BASE_URL
					});
				};
			})(document, 'script');
		</script>
	{/if}
</article>
