<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Launching: Codeball 1.0'
		}
	});
</script>

<script lang="ts">
	import Button from '$lib/Button.svelte';
	import ReadMore from '$lib/blog/ReadMore.svelte';
</script>

<div class="prose mb-4">
	<h1>Launching: Codeball 1.0</h1>

	<img src="/Banner10.png" alt="Codeball 1.0" />

	<p>
		Today we're happy to launch Codeball 1.0 to the world! Codeball is an AI trained to perform Code
		Review. After months in beta, and hard work together with the beta community, we're proud to
		announce the first public release of Codeball!
	</p>

	<p>
		Codeball is now used by many private organizations, as well as over <strong
			>120 public organizations</strong
		> on GitHub! Including big communities like Gogs, EMQX, and SigNoz (combined with over 100k stars
		🤩)!
	</p>

	<p>
		After having used Codeball for up to three months, some of our beta users are reporting that
		they are spending up to 40% less time on code review with Codeball compared to before.
	</p>

	<h2>Configurable and customizable AI</h2>

	<p>
		Since the launch of the Codeball<sup class="text-red-700">beta</sup> earlier in 2022, we've shipped
		multiple new improvements to both the AI and the GitHub Action that's used to interact with it.
	</p>

	<p>Our favourite improvements include:</p>

	<ul>
		<li>Improved AI performance! 🧠</li>
		<li>
			Fully customizable GitHub Action usage as of the new <code>@v2</code> release. Use conditions in
			actions for when and where to trigger Codeball, fully integrated into your own workflows.
		</li>
		<li>Support for forks and public repositories [<a href="/action">read more</a>].</li>
		<li>Dashboards and statistics, learn more about how your org is using Codeball</li>
		<li>Configurable AI</li>
	</ul>

	<h2>Configurability</h2>

	<p>
		Codeball has been trained on millions of code contributions from our global dataset. And has
		been trained to predict the likelihood of a contribution getting approved.
	</p>

	<div class="space-y-4 rounded-lg bg-white p-4 shadow-md">
		<img src="/settings-reckless.png" class="m-0 " />
		<em class="text-gray-400">Codeball configurable behaviour</em>
	</div>

	<p>
		By default, Codeball will perform at an optimal level for everyone, trained to be good for the
		average team.
	</p>

	<p>
		For high performance teams, that want to get even more out of Codeball, we're now introducing a
		new <strong>"Reckless"-setting</strong>, which will indicate to Codeball that your team have
		different performance characteristics than the average development team, and that you want
		Codeball to adopt it's style to work better for you.
	</p>

	<h2>New Pricing</h2>

	<p>
		As promised, Codeball now has a new pricing model after the end of the beta program. For private
		repositories, Codeball is now <strong>$10/user/month</strong>. Codeball will continue to be
		<strong>100% free</strong> for public repositories.
	</p>

	<p>
		We're committed to making sure that Codeball saves you money, and will only charge you money if
		you're <strong>actually saving money</strong>.
	</p>

	<p>
		The paid plan for private repositories, comes with a free 30 day trial, with no credit card
		required.
	</p>
</div>

<Button href="/">HIRE A BOT</Button>

<div class="prose mt-4">
	<p class="text-blue-600">
		With 🧠 from the Codeballers (Kiril, Nikita, and Gustav),<br />
		August 2022
	</p>

	<hr />
</div>

<ReadMore />
