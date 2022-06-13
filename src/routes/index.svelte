<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff: { login } }) => ({
		props: { login: login ?? null }
	});
</script>

<script lang="ts">
	import { FakePulls, GitHubLoginButton, AnalyzeForm, Logos } from '$lib/components/index';
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
		</div>

		<div class="hidden w-[24rem] lg:block">
			<FakePulls />
		</div>
	</div>

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
</article>
