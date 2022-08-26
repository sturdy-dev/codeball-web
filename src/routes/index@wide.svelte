<script lang="ts" context="module">
    import type {Load} from '@sveltejs/kit';

    export const load: Load = async ({stuff: {login}}) => ({
        props: {login: login ?? null},
        stuff: {
            showAnnouncementBanner: false
        }
    });
</script>

<script lang="ts">
    import {AnalyzeForm, Logos} from '$lib/components/index';
    import Button from '$lib/Button.svelte';

    export let login: string | null;
</script>

<article class="flex w-full flex-col items-center space-y-16 bg-fuchsia-100">
    <div class="flex w-full max-w-7xl items-center justify-around gap-16 py-16">
        <div class="flex flex-col gap-8">
            <h1 class="text-5xl font-bold">
                Increase<br/>your<br/>engineering<br/><span class="text-orange-600">velocity</span>
            </h1>

            <ul class="flex flex-col gap-2">
                <li class="inline-flex gap-4">
                    <div>⚫️</div>
                    <div>AI power suite</div>
                </li>
                <li class="inline-flex gap-4">
                    <div>⚫️</div>
                    <div>Approves (good) PRs</div>
                </li>
                <li class="inline-flex gap-4">
                    <div>⚫️</div>
                    <div>No configuration needed</div>
                </li>
                <li class="inline-flex gap-4">
                    <div>⚫️</div>
                    <div>Codes for you</div>
                </li>
                <li class="inline-flex gap-4">
                    <div>⚫️</div>
                    <div>Python, Go, C++, Java, and more</div>
                </li>
            </ul>

            <div>
                <Button href="#setup">Get started</Button>
            </div>
        </div>

        <div class="max-w-[30rem]">
            <Logos/>
        </div>
    </div>

    <div
            style="background-position: bottom -6rem right -8rem;"
            class="flex h-[55rem] w-full justify-around	bg-[url('/armadillo/big-office.png')] bg-no-repeat"
    >
        <div class="w-full max-w-7xl space-y-8">
            <h1 class="text-5xl font-bold">Codeball is your AI powered toolset</h1>
            <p class="max-w-3xl text-gray-600">
                Codeball uses AI to improve your engineering productivity from day 0. Using our own dataset
                of millions of merged Pull Requests and code contributions and OpenAI Codex, we've built
                some of the most powerful coding AIs in the world. The Codeball
            </p>
            <p class="max-w-3xl text-gray-600">
                AI will help your developers ship more quickly<br/>and with higher confidence.
            </p>
        </div>
    </div>
</article>

<div class="flex w-full flex-col items-center space-y-16 bg-white py-16">
    <div class="flex w-4/5 items-center gap-16 rounded-xl bg-blue-200 p-8 py-16">
        <img src="/armadillo/coffee-transformed.png" class="h-40 flex-shrink-0"/>
        <div class="flex flex-col gap-2 text-sm text-gray-700">
            <h2 class="text-xl font-normal tracking-tight">Codeball Approver</h2>
            <p>
                Approver uses advanced Artificial Intelligence to grade Pull Requests, and will approve Pull
                Requests that it's confident in, so that you don't have to wait for review.
            </p>
            <p>The Approver is easy to add to any GitHub repository, with a single click installation.</p>
        </div>
        <div class="w-32 flex-shrink-0">
            <Button href="https://github.com/sturdy-dev/codeball-action">Add it</Button>
        </div>
    </div>

    <div class="flex w-4/5 items-center gap-16 rounded-xl bg-blue-200 p-8 py-16">
        <img src="/armadillo/pingpong-transformed.png" class="h-40 flex-shrink-0"/>
        <div class="flex flex-col gap-2 text-sm text-gray-700">
            <h2 class="text-xl font-normal tracking-tight">Codeball Suggester</h2>
            <p>
                The Suggester is powered by OpenAI Codex and converts comment feedback in Code Review to
                actionable diff suggestions.
            </p>
            <p>The Approver is easy to add to any GitHub repository, with a single click installation.</p>
        </div>
        <div class="w-32 flex-shrink-0">
            <Button href="/suggester">Show me</Button>
        </div>
    </div>
</div>

<div class="max-w-7xl mx-auto">
    <div>
        You don't need to trust our marketing speak. Try Codeball on your repository (for free):
    </div>
    <AnalyzeForm/>
</div>

<div>
    <h2>Let's go</h2>
    <Button>Show me how</Button>
</div>

<div class="mb-32"></div>
