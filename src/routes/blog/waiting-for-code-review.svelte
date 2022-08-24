<script context="module" lang="ts">
	import mergeTimesNoObjection from '$lib/assets/merge_times_no_objection.svg';
	import mergeTimesWithObjection from '$lib/assets/merge_times_with_objection.svg';
	import yearsWaited from '$lib/assets/years_waited.svg';
	import mergeTimesTrend from '$lib/assets/merge_times_trend.svg';
	import codeball from '$lib/assets/adopting_codeball.svg';
	export const load = () => ({
		stuff: {
			title: 'You are waiting for code review more than you should'
		}
	});
</script>

<script lang="ts">
	import Button from '$lib/Button.svelte';
	import ReadMore from '$lib/blog/ReadMore.svelte';
</script>

<div class="prose mb-4">
	<h1>You are waiting for code review more than you should</h1>

	<div class="flex flex-row items-center gap-4">
		<img src="/avatars/kiril.jpeg" class="w-10 rounded-full" />
		<div class="flex flex-col text-xs">
			<div>Kiril Videlov</div>
			<div>August 4th, 2022</div>
			<div>Reading time: 4 minutes</div>
		</div>
	</div>

	<p>
		If you are reading this, chances are, you are in some way involved with the creation of
		software. You are probably well aware that <a href="https://en.wikipedia.org/wiki/Code_review"
			>code reviews</a
		> are considered a best practice.
	</p>
	<p>
		What you may not know is that, <b>64.3%</b> of Pull Requests are merged without any code changes
		as a result of the review. This means that only in 1/3 of reviews yielded a change to the proposed
		code.
	</p>

	<h2>🗃 Dataset</h2>
	<p>
		We have been collecting open source data for a while, and in this post we will share insights
		from analyzing <b>2,340,078</b> PRs spread across <b>7,836</b> organizations. The dataset is specifically
		derived from repositories that exhibit teamwork. Thankfully, with so many software companies embracing
		open source, there are plenty of examples of different styles of collaboration.
	</p>

	<h2>🔮 Code review outcomes</h2>
	<p>Generally speaking, the fate of a PR being reviewed will follow one of these two paths:</p>
	<ul>
		<li>
			Merged as is (aka LGTM'd) — <b>1,504,914</b> PRs in the dataset
		</li>
		<li>
			Merged with changes as a result of feedback (comments, suggestions etc.) — <b>835,164</b> PRs in
			the dataset
		</li>
	</ul>

	<h2>⏳ Time to merge PRs</h2>
	<p>Let's look at how much people wait for their PRs to be merged.</p>

	<p>
		On average, the time between a PR being opened and it being merged is <b>128 hours</b> (~5
		days). If we look only at the PRs that were LGTM'd this number is <b>74 hours</b> (~3 days) and
		for the other 35.7% of PRs the average lead time is <b>225 hours</b> (~9 days).
	</p>

	<p>
		Here are two histograms with the probability distributions of merge times for LGTM'd and
		non-LGTM'd PRs.
	</p>

	<div class="flex flex-row">
		<img
			alt="Pull Request merge times when no changes were requested during review"
			src={mergeTimesNoObjection}
			class="w-1/2"
		/>
		<img
			alt="Pull Request merge times when changes are added because of the review"
			src={mergeTimesWithObjection}
			class="w-1/2"
		/>
	</div>

	<p>
		Of course, the PRs that are LGTM-merged are either simpler, smaller or simply low risk, so the
		lead time is significantly lower. However, the cumulative wait time for changes that were <b
			>already good to go</b
		> is significant.
	</p>

	<p>
		In this dataset, the total time waiting for Pull Requests to be merged (without any changes as a
		result of the review) is <b>12,718 years</b>. For the PRs that got corrections, the time waiting
		adds up to <b>21,437 years</b>.
	</p>
	<img alt="Y" src={yearsWaited} class="w-full" />

	<p>
		The astronomical absolute values aside, we can see that a whooping <b>37%</b> of the time waited
		was more or less unnecessary.
	</p>
	<p>Looking at the trend over the past three years, it is evident lead times are going down.</p>
	<div class="flex justify-center">
		<img alt="Y" src={mergeTimesTrend} class="w-3/4" />
	</div>

	<p>
		A very similar trend is also observed by <a
			href="https://octoverse.github.com/writing-code-faster/#merging-pull-requests"
			>GitHub themselves</a
		>. This is because more and more teams are choosing to ship small and often, adopting techniques
		like <a href="https://trunkbaseddevelopment.com/">Trunk based development</a> and Continuous delivery.
	</p>

	<h2>🎭 What is code review anyways</h2>
	<p>
		Knowledge sharing aside, code review is meant to act as a quality gate. A good review should
		encompass multiple aspects of the code (e.g. fit for purpose, free of errors etc.), but, let's
		be honest, in practice, reviews are <b>transactional</b>.
	</p>

	<h4>As an author:</h4>
	<p>You need your code reviewed so that you can ship it and continue iterating.</p>

	<h4>As a reviewer:</h4>
	<p>You want to unblock your teammate and get back to your own code.</p>

	<p>
		Of course, in both cases, we don't want to compromise on quality, but not all code changes hold
		the same amount of impact and risk. I'd go as far as claiming that code reviews at most teams
		are largely <b>pattern matching</b> — e.g.: "Have I seen this pattern succeed before?", "Is the author
		familiar with this subsystem?" etc. When a sufficient number of mental tick boxes are checked, we
		are ready to declare LGTM.
	</p>

	<h2>🤖 Automation</h2>

	<p>
		Programmers love to automate their work — think of all the formatters, linters and static
		analysis tools in existence. Just for fun, here's a <a href="../../what"
			>comparison between car automation and code automation</a
		>.
	</p>

	<p>
		<a href="/">Codeball</a> is a new and ballsy attempt at taking automation further. It
		<a href="../../how">simulates</a>
		the developer intuition and approves <b>safe</b> pull requests, saving teams time.
	</p>

	<p>
		The best way of illustrating the impact of such advanced automation is by looking at how it
		affected the Pull Request merge times for a team using it.
	</p>

	<img alt="Pull request merge times when adopting Codeball" src={codeball} class="w-full" />

	<p>
		While there always are tricky Pull Requests that require human review, Codeball identifies and
		approves a large proportion of PRs that would have been LGTM'd by a human. Naturally, this team
		spends less time dealing with such PRs.
	</p>

	<p>
		If this sounds too good to be true, this is because a technological innovation is upon us! Go
		and <a href="/">test</a> it out on your own repository!
	</p>

	<p class="mb-16">
		Thanks for reading!
		<br />
		- <a href="https://twitter.com/krlvi">Kiril</a>
	</p>
</div>

<Button href="/">HIRE A BOT</Button>

<ReadMore />
