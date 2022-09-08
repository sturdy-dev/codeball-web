<script lang="ts">
	import Button from '$lib/Button.svelte';

	export let repoURL;

	const actionContents = `name: Codeball
on:
  pull_request: {}
  pull_request_review_comment:
    types: [created, edited]

jobs:
  codeball_job:
    runs-on: ubuntu-latest
    name: Codeball
    steps:
      # Run Codeball on all new Pull Requests and Review Comments! 🚀
      # For customizations and more documentation, see https://github.com/sturdy-dev/codeball-action
      - name: Codeball
        uses: sturdy-dev/codeball-action@v2
        with:
          approvePullRequests: "true"
          labelPullRequestsWhenApproved: "true"
          labelPullRequestsWhenReviewNeeded: "false"
          failJobsWhenReviewNeeded: "false"
`;

	const getRepoName = (url: string): string | undefined => {
		if (url.startsWith('https://github.com/')) {
			const p = url.split('/');
			if (p.length > 4) {
				return p[3] + '/' + p[4];
			}
		}
		if (url.startsWith('github.com/')) {
			const p = url.split('/');
			if (p.length > 2) {
				return p[1] + '/' + p[2];
			}
		}
		return undefined;
	};

	$: repoName = getRepoName(repoURL);

	const branchName = 'main';

	$: params = new URLSearchParams({
		filename: '.github/workflows/codeball.yml',
		value: actionContents
	});

	$: addUrl = `https://github.com/${repoName}/new/${branchName}/?${params}`;
</script>

<div class="flex flex-col items-center">
	<Button
		disabled={!repoName}
		event="umami--click--install-the-action-custom-url"
		color="violet"
		href={addUrl}>Install the Action</Button
	>

	{#if repoName}
		<div class="text-sm text-gray-500">
			{repoName}
		</div>
	{/if}
</div>
