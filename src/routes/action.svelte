<script context="module" lang="ts">
    export const load = () => ({
        stuff: {
            title: 'Codeball Action'
        }
    });
</script>

<script lang="ts">
    import writePrivateForks from '$lib/assets/github-screenshot-permissions-private-repo.png'
</script>

<article class="font-mono">
    <h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">Codeball Action</h1>

    <div class="my-8 flex flex-col gap-16 lg:flex-row">
        <div class="flex flex-col gap-8">
            <p class="text-xl text-gray-500 sm:max-w-xl">Documentation for the Codeball Action</p>

            <div class="flex flex-col gap-12">
                <div class="text-md prose text-gray-500">
                    <h3 class="text-xl text-gray-800">Installation</h3>
                    <ol>
                        <li>Create a new file in your repository called <code>.github/workflows/codeball.yml</code> with the following content:

                            <pre>name: Codeball
on: [pull_request]

jobs:
  codeball_job:
    runs-on: ubuntu-latest
    name: Codeball
    steps:
      - name: Codeball
        uses: sturdy-dev/codeball-action@v2
        with:
          approvePullRequests: "true"
          labelPullRequestsWhenApproved: "true"
          labelPullRequestsWhenReviewNeeded: "false"
          failJobsWhenReviewNeeded: "false"</pre>

                        </li>
                        <li>Commit and push this change to your repository, and you're done! 🎉</li>
                    </ol>

                    <h3 class="text-xl text-gray-800">Customization</h3>
                    <p>
                        Codeball is built in a modular way, and can be heavily customized to your needs. We've collected some examples in the <a href="https://github.com/sturdy-dev/codeball-action#customizations">sturdy-dev/codeball-action README</a>.
                    </p>

                    <h3 class="text-xl text-gray-800">Advanced permissions</h3>
                    <p>
                        The <a href="https://github.com/sturdy-dev/codeball-action">Codeball Action</a> for GitHub
                        Actions will by default use the permissions granted to it from GitHub Actions.
                    </p>
                    <p>GitHub actions generates a temporary access token that is valid for the duration of the action
                        execution, and grants write access the pull request (required to approve PRs, and to add
                        labels).</p>
                    <p>
                        Pull Requests created from a fork, does not have write access to the repository by default, and
                        requires the additional <a
                            href="https://github.com/apps/codeball-ai-writer">codeball-ai-writer</a> GitHub application
                        to be installed to function correctly. This works for both <strong>public and private</strong>
                        repositories.
                    </p>
                    <p>Alternatively: If you're using Pull Requests from a fork in a <strong>private</strong>
                        repository, you can enable WRITE permission forwarding on the GitHub repository settings. </p>
                    <img alt="Screenshot showing how to enable 'Send write tokens to workflows from fork pull requests'" src={writePrivateForks} class="shadow rounded-md"/>
                </div>
            </div>
        </div>
    </div>
</article>
