<script context="module" lang="ts">
    export const load = () => ({
        stuff: {
            title: 'Codeball – Actually improve your DORA metrics '
        }
    });
</script>

<script lang="ts">
    import Button from '$lib/Button.svelte';
    import Separator from '$lib/Separator.svelte';
</script>

<div class="flex flex-col gap-32 p-12">

    <div class="flex items-start gap-32 justify-center flex-col lg:flex-row">
        <div>
            <h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl font-mono"><span class="text-orange-400">DORA</span> metrics</h1>
        </div>

        <div class="lg:max-w-[24rem] space-y-4 text-gray-700 text-lg">
            <p>Engineering teams love to track their DORA metrics (<a class="underline"
                    href="https://www.devops-research.com/research.html">DevOps Research and Assessment</a>), to get
                data on how well their team is doing, and to help deliver software faster. The for metrics are:</p>

            <ul class="list-inside list-disc">
                <li><strong>Change Lead Time</strong></li>
                <li><strong>Deployment Frequency</strong></li>
                <li><strong>Change Failure Rate</strong></li>
                <li><strong>Mean Time To Recovery</strong></li>
            </ul>

        </div>
    </div>

    <Separator up="{true}"/>

    <div class="flex items-end gap-32 justify-center flex-col lg:flex-row-reverse">
        <div>
            <h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl font-mono"><span class="text-orange-600">Not</span> a dashboard</h1>
        </div>
        <div class="lg:max-w-[24rem] space-y-4 text-gray-700 text-lg">
            <p>There are many companies that will sell you dashboards, but not doing much to <em>actually</em> help you
                improve.
                Codeball is a <strong>plug-and-play AI that automatically improves your stats</strong> – from day one!
            </p>
        </div>
    </div>

    <Separator />

    <div class="flex items-start gap-32 justify-center flex-col lg:flex-row">
        <div class="space-y-8">
            <h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl font-mono">
                Using <span class="text-orange-400">AI</span>
            </h1>

            <div class="text-gray-400 text-center">(Add AI to your resume, comes with a free 20% promotion-guarantee!)</div>

            <div class="bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4 rounded-xl shadow-x ">
                <img src="./dora-lead-times.png" height="1080" width="1920"  />
            </div>
        </div>
        <div class="lg:max-w-[24rem] space-y-4 text-gray-700 text-lg">
            <p>
                The Codeball AI has been trained to behave like a human would <span class="text-gray-400">(except it's fast, doesn't get sick, and is never stuck in a meeting)</span>.
                </p>

            <p>
                Add Codeball to your workflow to automatically improve your <strong>Change Lead Time</strong>, by automating Code Review, without sacrificing security.
            </p>

            <p>
                Codeball only approves <strong>safe</strong> contributions, and leaves the trickier ones for you to review.
                You'll review the trickier PRs yourself, just like before, but without getting annoyed by the noise of the easier PRs.
            </p>
        </div>
    </div>

    <Separator up="{true}"/>

    <div class="flex items-start gap-32 justify-center flex-col lg:flex-row-reverse">
        <div class="space-y-8">
            <h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl font-mono">Start <span class="text-orange-600">now</span></h1>
        </div>

        <div class="lg:max-w-[24rem] space-y-4 text-gray-700 text-lg lg:mt-32">
            <p>Get started with Codeball for free today <span class="text-gray-400">(30-day free trial, no credit card required)</span>. After 30 days, you'll only have to pay if Codeball is saving you time.</p>
            <Button href="https://github.com/sturdy-dev/codeball-action">Add the Codeball GitHub Action</Button>
        </div>
    </div>

</div>