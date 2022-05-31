<script lang="ts">
	import Button from './Button.svelte';
	import type { Job } from '$lib/jobs';

	export let job: Job;

	const actionContents = `name: Codeball
on: [pull_request]

jobs:
  codeball_job:
    runs-on: ubuntu-latest
    name: Codeball
    steps:
      # Run Codeball on all new Pull Requests 🚀
      # For customizations and more documentation, see https://github.com/sturdy-dev/codeball-action
      - name: Codeball
        uses: sturdy-dev/codeball-action@v2
`;

	$: repoName = job.repository?.name;

	$: params = new URLSearchParams({
		filename: '.github/workflows/codeball.yml',
		value: actionContents
	});

	$: addUrl = `https://github.com/${repoName}/new/master/?${params}`;
</script>

<Button href={addUrl}>Add the Codeball GitHub Action to {repoName}</Button>
