<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball Suggestions'
		}
	});
</script>

<script lang="ts">
	const script = `name: Codeball
on:
  pull_request: {}
  pull_request_review_comment:
    types: [created, edited]
jobs:
  codeball_job:
    runs-on: ubuntu-latest
    name: Codeball
    steps:
      - name: Codeball
        uses: sturdy-dev/codeball-action@v2
        with:
          # Settings for "Codeball Suggester"
          codeSuggestionsFromComments: "true"

          # Settings for "Codeball Approver"
          approvePullRequests: "false" # Set to "true" to enable!
          labelPullRequestsWhenApproved: "false" # Set to "true" to enable!
          labelPullRequestsWhenReviewNeeded: "false"
          failJobsWhenReviewNeeded: "false"
`;
</script>

<article class="font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">Codeball Suggestions</h1>

	<div class="my-8 flex flex-col gap-16 lg:flex-row">
		<div class="flex flex-col gap-8">
			<p class="text-xl text-gray-500 sm:max-w-xl">
				How to setup and install Codeball Comment Suggestions using <strong>GitHub Actions</strong>.
			</p>

			<div class="flex flex-col gap-12">
				<div class="text-md prose text-gray-500">
					<h3 class="text-xl text-gray-800">Installation</h3>
					<ol>
						<li>
							Create a new file in your repository called <code>.github/workflows/codeball.yml</code
							>
							with the following content:

							<pre>{script}</pre>
						</li>
						<li>Commit and push this change to your repository, and you're done! 🎉</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</article>
