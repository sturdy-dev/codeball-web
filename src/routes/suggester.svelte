<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball Suggestions'
		}
	});
</script>

<script lang="ts">
	const script = `on:
  pull_request_review_comment:
    types: [created, edited]
name: Codeball
jobs:
  codeball_job:
    runs-on: ubuntu-latest
    name: Codeball
    steps:
    - name: Trigger Codeball
      id: codeball_baller
      uses: sturdy-dev/codeball-action/baller@beta

    - name: Get Status
      id: codeball_status
      uses: sturdy-dev/codeball-action/status@beta
      with:
        codeball-job-id: \${{ steps.codeball_baller.outputs.codeball-job-id }}

    - name: Post Suggestions
      uses: sturdy-dev/codeball-action/suggester@beta
      if: \${{ steps.codeball_status.outputs.suggested == 'true' }}
      with:
        codeball-job-id: \${{ steps.codeball_baller.outputs.codeball-job-id }}`;
</script>

<article class="font-mono">
	<h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">Codeball Suggestions</h1>

	<div class="my-8 flex flex-col gap-16 lg:flex-row">
		<div class="flex flex-col gap-8">
			<p class="text-xl text-gray-500 sm:max-w-xl">
				This documentation is upcoming an upcoming, <strong>unreleased</strong> Codeball feature
			</p>

			<div class="flex flex-col gap-12">
				<div class="text-md prose text-gray-500">
					<h3 class="text-xl text-gray-800">Installation</h3>
					<ol>
						<li>
							Create a new file in your repository called <code
								>.github/workflows/codeball-suggestion.yml</code
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
