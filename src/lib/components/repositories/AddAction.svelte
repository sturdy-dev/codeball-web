<script lang="ts">
	import Button from '../../Button.svelte';
	import type { Job } from '../../jobs';

	export let job: Job;

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

	$: repoName = job.repository?.name;

	$: branchName = job.repository?.default_branch_name || 'master';

	$: params = new URLSearchParams({
		filename: '.github/workflows/codeball.yml',
		value: actionContents
	});

	$: addUrl = `https://github.com/${repoName}/new/${branchName}/?${params}`;
</script>

{#if repoName}
	<Button color="black" href={addUrl}>Add the Codeball GitHub Action to {repoName}</Button>
{:else}
	<Button color="black" href="https://github.com/sturdy-dev/codeball-action"
		>Codeball GitHub Action</Button
	>
{/if}
