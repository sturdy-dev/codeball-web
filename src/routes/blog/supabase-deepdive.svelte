<script lang="ts">
	import imgBallWithBrain from '$lib/assets/BallWithBrainRaster.png';
</script>

<div class="prose">
	<h1>Deepdive and explanation of Codeball for Supabase.</h1>

	<p>
		<a href="/">Codeball</a> is an AI trained to perform code review, and the first available
		version – <strong>CODEBALL-1</strong>, is able to accurately identify PRs that will be approved.
	</p>

	<p>
		Supabase is a well-known open-source project mainly built and maintained by employees of the
		company with the same name. We've used Supabase as the default example for the Codeball demo
		site, because Supabase is an open-source project that's largely run like any project at
		closed-source companies
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

	<p>
		Codeball <strong>correctly</strong> predicted the instant-YOLO-merge for 14 out of the 36 Pull Requests,
		and did not approve a single PR that was rejected or further iterated on.
	</p>

	<p>
		Codeball was unsure about 18 PRs that ended up getting merged directly, and opted to not merge
		them.
	</p>

	<p class="border-l-4 border-black py-1 pl-4">
		Sidenote: Kudos to Supabase for having such a high approval rate, and zero-to-no bike shedding
		going on in the PRs! A 72% instant-LGTM ratio is higher than the industry average of 65%.
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
		– <a href="https://news.ycombinator.com/item?id=31534424">apugoneappu on Hacker News</a>
	</p>

	<h2>Why do some PRs get approved?</h2>

	<p>
		Codeball calculates many different characteristics ("features") for a PR. This includes things
		like diff itself, but also the size and shape of the diffs of in the PR, the authors previous
		contributions to the modified files, the authors history with the repository and nearby
		directories, as well as the health of the files and repository itself
		<span class="text-gray-500">
			(+ a few other things, but that's a business secret apparently)
		</span>.
	</p>

	<p>
		Honestly it's a bit of a black box, and I'm just here to write a blog post. So this will be a
		bit of guessing, and me going through all 50 PRs manually
		<span class="text-gray-500">(this was a very intimate exercise)</span>
		to try to identify indicators to look at, and why Codeball potentially might have approved the PR.
	</p>

	<ul>
		<li>
			11 PRs only changed files that where almost entirely or entirely
			<strong
				>created by the PR author</strong
			>.
			And included many "quick fixes" to earlier PRs.<br />
			9 <span class="text-gray-500">(81%)</span> of these where approved by the humans, and 5
			<span class="text-gray-500">(45%)</span> where approved by Codeball. The recall here is 55%. It's
			higher than normal, but not abnormally so.
		</li>
		<li>
			The average number of <strong>files modified per PR is 4.6</strong> For the ones that Codeball
			approved, the average is 1.41, and for the human approved it's a bit higher at 3.79.
		</li>
		<li>
			26 PRs <strong>changed only a single file</strong> 24 of these where instantly approved by the
			humans
			<span class="text-gray-500">(including 6 PRs from external and first time contributors)</span
			>. Codeball approved 11 <span class="text-gray-500">(recall: 45%)</span> of the PRs with only 1
			file changed.
		</li>
		<li>
			19 PRs changed more than 1 file. 12 of these where YOLO-approved by the team, Codeball only
			approved 3 of them <span class="text-gray-500">(recall: 25%)</span>. Codeball approved 3 PRs
			that had more than 1 file changed:
		</li>
		<ul>
			<!-- 7128 -->
			<li>
				One bugfix with added tests, 4 files changed in total, all files where previously created by
				the same author.
			</li>
			<!-- 7201 -->
			<li>
				One bugfix with deleted code, 2 files changed in total, none of the files where previously
				edited by the author.
			</li>
			<!-- 7262 -->
			<li>
				One bugfix with added code, 2 files chained in total, all files where previously created by
				the same author.
			</li>
		</ul>
	</ul>

	<p>
		This indicates that while Codeball never guessed anything wrong, tt's not very confident when
		predicting larger Pull Requests (it's a chicken).
	</p>

	<p class="border-l-4 border-black py-1 pl-4">
		Codeball has a higher accuracy (~99%) than the
		<a
			href="https://www.nhs.uk/conditions/contraception/male-condoms/#:~:text=When%20used%20correctly%20every%20time,are%20used%20as%20contraception."
			>
			efficacy of condoms
		</a>
		(98%). Similarly to the usage of condoms, both have a "Plan B" readily available
		<sup><a id="back-ref-1" href="#ref-1">1</a></sup>
		(revert the PR).
	</p>

	<h2>What benefits would usage of Codeball have for the Supabase team?</h2>

	<p>
		The Supabase team are pretty diligent, and are usually pretty fast to approve PRs. There might
		be a lot of spam of the "hey plzzz approve my PR"-kind happening on their private Slack or
		something, but we can't really see it.
	</p>

	<ul>
		<li>
			16 <span class="text-gray-500">(32%)</span> PRs where approved and merged
			<strong>within 1 hour</strong>
		</li>
		<li>
			22 <span class="text-gray-500">(44%)</span> PRs had to wait between 1 and 24 hours to receive their
			first review
		</li>
		<li>
			12 <span class="text-gray-500">(24%)</span> PRs waited for more than 24 hours to receive their
			first review
		</li>
	</ul>

	<p>
		The slowest PR was open for 5 days before getting the first review (which Codeball correctly
		approved btw 😉).
	</p>

	<p>
		The time-to-merge for the Pull Requests that Codeball approved was spread out in buckets of
		roughly the same size (25% / 50% / 25%).
		<!---
            <a href="https://github.com/supabase/supabase/pull/7128">#7128</a>,
            <a href="https://github.com/supabase/supabase/pull/7176">#7176</a>,
            <a href="https://github.com/supabase/supabase/pull/7203">#7203</a>,
        --->
	</p>

	<p>
		We won't go into the details of why faster-merge-is-better and will save you 💰💸🤑💲. Others
		have already done that, and it's boring....
	</p>

	<p>
		One way to apply CODEBALL-1 to your repository is to allow Codeball to approve incoming PRs that
		are safe, and with an immediate review (running Codeball takes just a few seconds), merge the PR
		right away if Codeball considers it safe.
	</p>

	<p>
		When used in this setup, you'll both save the time wasted waiting for review (and ship features
		and fixes faster), as well as save time wasted when context switching from coding on one task,
		to reviewing, and then back again.
	</p>

	<p class="border-l-4 border-black py-1 pl-4">
		Thanks for reading.
	</p>

	<hr />

	<ul>
		<li class="text-sm text-gray-500 ">
			Codeball is not affiliated with Supabase, we're just fans. Or is this an elaborate attempt to
			try to get Supabase to install Codeball? We should get something from this free marketing
			we're giving them....
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
