<script lang="ts">
	import Button from '$lib/Button.svelte';
</script>

<div class="prose mb-4">
	<h1>Codeball AI Code Review, a deepdive into the numbers</h1>

	<p>
		<a href="/">Codeball</a> is an AI trained to perform code review, and the first available
		version – <strong>CODEBALL-1</strong>, is able to accurately identify PRs that will be approved.
	</p>

	<p>
		What happens when you add Codeball to your project, is it safe, and can it even save you money?
		Let's dig into the numbers from the default Codeball demo from the index page.
	</p>

	<p>
		Supabase is a well-known open-source project mainly built and maintained by employees of the
		company with the same name. We've used Supabase as the default example for the Codeball demo
		site, because is an open-source project that's largely run like any project at closed-source
		companies <span class="text-gray-500">(business === money)</span>
		<span class="text-gray-500">(and because the results are pretty good)</span>.
	</p>

	<p>
		The <a href="/">Codeball demo</a> runs Codeball on the latest 50 merged PRs
		<span class="text-gray-500">(in this case, created between 2022-06-02 and 2022-06-13)</span>,
		and compares the outcome with what Codeball would have done if it had been run on the PRs
		originally.
	</p>

	<p>
		For the latest 50 Pull Requests in
		<a href="https://github.com/supabase/supabase">supabase/supabase</a>:
	</p>

	<ul>
		<li>
			<strong>32</strong> where approved without any further feedback or modifications, the only comment
			on these PRs is the comment to approve the PR.
		</li>
		<li>
			<strong>4</strong> PRs where modified by the author after opening the PR, triggered by failing
			tests etc, and then instantly approved
			<span class="text-gray-500">(in the demo, these are labeled as "Gave feedback").</span>
		</li>
		<li>
			<strong>14</strong> PRs received feedback or "requested changes" and where updated at least once
			before getting merged.
		</li>
	</ul>

	<div class="flex w-full items-center">
		<div class="bg-green-300 text-center text-green-800" style="width: 72%">Approved (72%)</div>
		<div class="flex-1 bg-red-300 text-center text-red-800">Got feedback</div>
	</div>

	<p>
		Codeball <strong>correctly</strong> predicted the instant-YOLO-merge for 14 out of the 36 Pull Requests,
		and did not approve a single PR that was rejected or further iterated on.
	</p>

	<div class="flex w-full items-center">
		<div class="bg-green-300 text-center text-green-800" style="width: 28%">Approved (28%)</div>
		<div class="text-blue-480 bg-blue-300 text-center" style="width: 44%">Not Approved</div>
		<div class="flex-1 bg-red-300 text-center text-red-800">Not Approved</div>
	</div>

	<p>
		Codeball was unsure about 18 PRs that ended up getting merged directly, did not approve them.
	</p>

	<p>
		The Codeball result can be expressed with a <em>confusion matrix</em> like so:
	</p>

	<div class="w-full md:mx-auto md:w-min ">
		<div class="grid bg-black text-white ">
			<div class=" col-span-2 col-start-3  p-4 px-12 text-center text-2xl font-medium">
				Prediction
			</div>
			<div class="col-start-3 p-4 text-center text-2xl font-black">✅</div>
			<div class="p-4 text-center  text-2xl font-black">❌</div>

			<div class="row-span-2 row-start-3 p-4 py-12 text-center text-2xl font-medium">
				<div style="writing-mode: vertical-lr; text-orientation: mixed;">Reality</div>
			</div>
			<div class="col-start-2 row-start-3 my-auto  p-4 text-center text-2xl">✅</div>
			<div class="col-start-2 row-start-4 my-auto  p-4 text-center text-2xl">❌</div>

			<div class="col-start-3 row-start-3 my-auto whitespace-nowrap px-8 text-center text-2xl">
				14<br /><span class="hidden text-sm text-gray-200 sm:inline-block">(true positive)</span>
			</div>
			<div class="col-start-4 row-start-3 my-auto whitespace-nowrap px-8 text-center text-2xl">
				22<br /><span class="hidden text-sm text-gray-200 sm:inline-block">(false negative)</span>
			</div>

			<div class="col-start-3 row-start-4  my-auto whitespace-nowrap px-8 text-center text-2xl">
				0<br /><span class="hidden text-sm text-gray-200 sm:inline-block">(false positive)</span>
			</div>
			<div class="col-start-4 row-start-4  my-auto whitespace-nowrap px-8 text-center text-2xl">
				14<br /><span class="hidden text-sm text-gray-200 sm:inline-block">(true negative)</span>
			</div>
		</div>
	</div>

	<p>
		This result gives Codeball a <em>recall</em> of 38% and a <em>precision</em> of 100%!
	</p>

	<p>
		Aka, it's not approving everything that it could have approved, but when it does approve
		something, it was <strong>never</strong> wrong.
	</p>

	<p>
		This is a very good thing. Codeball is able to flag safe PRs with a extremely high precision,
		and when it's unsure about what to do, it leaves the remaining work to the humans (just like
		before).
	</p>

	<p class="border-l-4 border-orange-800 py-1 pl-4">
		"So Codeball is like a strict bartender who only serves you when they are absolutely sure you're
		old enough. You may still be overage but Codeball's not serving you."
		<br />
		— <a href="https://news.ycombinator.com/item?id=31534424">apugoneappu on Hacker News</a>
	</p>

	<h2>What can we tell about Codeball's performance?</h2>

	<p>
		Codeball calculates many different characteristics ("features") for a PR. This includes things
		like diff itself, but also the size and shape of the diffs of in the PR, the authors previous
		contributions to the modified files, the authors history with the repository and nearby
		directories, as well as the health of the files and repository itself
		<span class="text-gray-500">
			(+ a few other things, but what they are is apparently a business secret)
		</span>.
	</p>

	<p class="border-l-4 border-black py-1 pl-4">
		Almost all Pull Requests ever created end up getting merged sooner or later, but some require
		one or many rounds of feedback and discussions before it's ready.<br /><br />
		In this blog post, "merged" and "approved" means that the first version of the Pull Request was approved
		and merged, and that the only feedback it got was some form of "LGTM 🚀🌕".
	</p>

	<p>
		Honestly it's a bit of a black box, and I'm just here to write a blog post. So this will be a
		bit of guessing, and me going through all 50 PRs manually to try to characterize the PRs and see
		if I can find any patterns <span class="text-gray-500"
			>(this was a very intimate exercise, it feels live I've gotten to know all core contributors)</span
		>.
	</p>

	<ul>
		<li>
			<strong>11</strong> PRs changed files that where entirely or almost entirely
			<strong>created by the PR author</strong>. These are often smaller improvements or fixes, and
			generally safer than the average Pull Request, as the author is already familiar with the
			code. 9 out of 11 PRs <span class="text-gray-500">(81%)</span> in this category was approved without
			further feedback.
		</li>
		<li>
			The average number of <strong>files modified per PR is 4.6</strong>. The PRs that where
			approved on the first iteration had an average of <strong>3.79</strong> files per PR.
		</li>
		<li>
			26 PRs <strong>changed only a single file</strong>, 24 of which where approved, including 6
			PRs from external and first-time contributors.
		</li>
		<li>
			19 PRs changed more than 1 file. 12 of these where YOLO-approved by the team <span
				class="text-gray-500">(being YOLO is a great thing)</span
			>.
		</li>
	</ul>

	<p>
		There is a clear trend that "smaller is better", which makes sense, a smaller PR has few lines
		of code that could potentially screw something up. And a bugfix is probably smaller (measured in
		LOC) than a feature addition.
	</p>

	<p>
		Codeball seems to agree, and picks up on this trend as well. Codeball has a higher-than-average
		recall for Pull Requests in the self-authored category (45%) and single-file-changed category
		(81%).
	</p>

	<p>
		What's cool is that while there is strong indicator that "smaller is better", not all small PRs
		where approved, and that Codeball was able to identify the PRs that should not be approved
		as-is, and for this demo, did not make a single mistake.
	</p>

	<p>
		For the latest 50 PRs to supabase/supabase the precision is 100%. Internally however, with much
		larger test set, there are of-course some false-positives, and the precision is around 99%.
	</p>

	<p class="border-l-4 border-black py-1 pl-4">
		Codeball has a higher precision (~99%) than the
		<a
			href="https://www.nhs.uk/conditions/contraception/male-condoms/#:~:text=When%20used%20correctly%20every%20time,are%20used%20as%20contraception."
		>
			efficacy of condoms
		</a>
		(98%). Similarly to the usage of condoms, both have a "Plan B" readily available
		<sup><a id="back-ref-1" href="#ref-1">1</a></sup>
		(identify the oopsie-doopsie and revert).
	</p>

	<h2>Can Codeball save money for Supabase?</h2>

	<p>
		In this world, time is money, and money is time. And it's popular to track metrics like "change
		lead time" etc etc.
	</p>

	<p>Out of the 50 latest PRs in the repository:</p>

	<ul>
		<li>
			16 <span class="text-gray-500">(32%)</span> PRs where approved and merged
			<strong>within 1 hour</strong>
		</li>
		<li>
			22 <span class="text-gray-500">(44%)</span> PRs had to wait
			<strong>between 1 and 24 hours</strong> to receive their first review
		</li>
		<li>
			12 <span class="text-gray-500">(24%)</span> PRs waited for <strong>more than 24 hours</strong>
			to receive their first review
		</li>
	</ul>

	<p>
		The slowest PR was open for 5 days before getting the first review <span class="text-gray-500"
			>(which Codeball correctly approved btw 😉)</span
		>.
	</p>

	<p>
		The time-to-merge for the Pull Requests that Codeball would have approved was spread out in
		buckets of roughly the same size (25% / 50% / 25%).
	</p>

	<p>
		It's hard to measure what the associated cost is to merge a PR after 24 hours instead of 15
		minutes, but it's safe to say that it's above 0.
	</p>

	<p>
		What's easier to argue for is that, for each of these PRs, someone had to interact with it at
		least three times: The author to create it, the reviewer to review it, and then for the author
		to go back to it to merge it.
	</p>

	<p>
		Each of these interactions takes a small amount of time, maybe just a minute or two, but they
		all add up, and then we haven't even included the cost of context switching.
	</p>

	<p>
		With an epic AI such as Codeball, it's possible to get the number of interactions required to
		merge a PR down to just one, and reducing the "time to merge" to just a few seconds.
	</p>

	<p>So yes, there is money to be saved here.</p>
</div>

<Button href="/">HIRE A BOT</Button>

<div class="prose mt-4">
	<p class="text-blue-600">
		With 🧠 from the Codeballers,<br />
		17th of June 2022
	</p>

	<hr />

	<ul>
		<li class="text-sm text-gray-500 ">
			Codeball is not affiliated with Supabase, we're just fans. Or is this an elaborate attempt to
			try to get Supabase to install Codeball?
		</li>
		<li class="text-sm text-gray-500">
			In some calculations above, some PRs from dependabot have been excluded, as those generally
			are not that interesting. This is why the total number of PRs does not always total to 50.
		</li>
		<li id="ref-1" class="text-sm text-gray-500">
			<sup>1</sup> Depending if you live in the
			<a href="https://en.wikipedia.org/wiki/Abortion_law">modern world</a>
			or not <a href="#back-ref-1">⤴️</a>
		</li>
	</ul>
</div>
