<script lang="ts">
	const faq: Array<{ name: string; description: string }> = [
		{
			name: 'What is Codeball?',
			description:
				'Codeball is an AI code-review bot. It approves Pull Requests that a human would have approved without objections or further feedback.'
		},

		{
			name: "Aren't those PRs easy to review anyways?",
			description:
				'Sure. And you still have to wait for it. 63% of all PRs are "👍 LGTM"-ed without objections. Codeball takes care of the easy PRs, and allows you to focus your energy on the trickier ones.'
		},

		{
			name: 'How does Codeball decide to approve a PR?',
			description:
				"It uses a deep learning model trained on millions of PRs from different organizations. Just like a very experienced human who has seen tons of failure <span class='text-gray-400'>(shitty code)</span> and success <span class='text-gray-400'>(decent code)</span> patterns. [<a href='/how' class='text-black'>more</a>]"
		},

		{
			name: 'What does Codeball look at when predicting?',
			description:
				"Hundreds of indicators. For example the semantics of the change, if similar changes been objected or reverted in the past, how experienced the author is with the code that they are changing etc. [<a href='/how' class='text-black'>more</a>]"
		},

		{
			name: 'Will Codeball make me a 10xer?',
			description: 'Nope.'
		},

		{
			name: 'Is this shit accurate?',
			description:
				'It turns out programmers are super boring and extremely predictable &mdash; think about it, review is mostly pattern matching. Codeball has a false positive rate of under 1%.'
		},

		{
			name: 'Does Codeball work for my repo?',
			description:
				"IDK? Use the [<a href='/' class='text-black'>money-saver-calculator</a>] to see how well Codeball performs on your repository."
		},

		{
			name: 'Is Codeball for me?',
			description:
				"If you don't like waiting for reviews on your PRs and the interruptions that come with it, then yeah, it is."
		},

		{
			name: 'How do I set it up?',
			description:
				"As a GitHub Action! <a href='https://github.com/sturdy-dev/codeball-action' class='text-black'>sturdy-dev/codeball-action@v1</a>"
		},

		{
			name: 'Does this cost $$$?',
			description:
				"Codeball is free while in <span class='text-red-500'>beta</span>. Commercial projects will have to pay for Codeball once it's out of beta.<br><br>It will be free for OSS, because we're so cool! <span class='text-gray-400 text-sm'>(totally not because it's free marketing).</span>"
		},

		{
			name: 'Where is the Privacy policy?',
			description: "It's here! [<a href='/privacy' class='text-black'>privacy</a>]"
		},

		{
			name: "Get in touch!",
			description: "Chat with the humans behind Codeball <span class='text-gray-400'>(100% AI-free support)</span><br> [<a href='https://github.com/sturdy-dev/codeball-action/issues/new' class='text-black'>open a new issue</a>] [<a href='mailto:support@getsturdy.com' class='text-black'>email us</a>]"
		}
	];
</script>

<article class="font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">FAQ</h1>

	<div class="my-8 flex flex-col gap-16 lg:flex-row">
		<div class="flex flex-col gap-8">
			<p class="text-xl text-gray-500 sm:max-w-xl">It's OK to have questions.</p>

			<div class="flex flex-col gap-12">
				{#each faq as q}
					<div class="max-w-prose">
						<h3 class="text-xl text-gray-800">{q.name}</h3>
						<p class="text-md mt-1 text-gray-500">{@html q.description}</p>
					</div>
				{/each}
			</div>

			<ul class="flex gap-2">
				<li>[<a href="/">index</a>]</li>
				<li>[<a href="/how">how</a>]</li>
				<li>[<a href="https://github.com/sturdy-dev/codeball-action">github action</a>]</li>
			</ul>
		</div>
	</div>
</article>
