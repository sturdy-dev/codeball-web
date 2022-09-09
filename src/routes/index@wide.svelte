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
    import {Logos, FeatureList, FeatureBox, Hero} from '$lib/components/index';
    import Button from '$lib/Button.svelte';

    import armadilloCoffee from '$lib/armadillo/coffee-2.png?preset=thumbnail&srcset';
    import armadilloTrackAndField from '$lib/armadillo/track-and-field.png?preset=thumbnail&srcset';
    import armadilloGraph from '$lib/armadillo/graph.png?preset=thumbnail&srcset';
    import armadilloAtTheComputerHD from '$lib/armadillo/at-the-computer-2.png?preset=hd&srcset';
    import CalendarDaysMini from '$lib/icons/CalendarDaysMini.svelte';
    import Animation from '../lib/components/index/scanner/Animation.svelte';

    import arrow1 from '$lib/assets/arrows/one.png?preset=hd&srcset';
    import arrow2 from '$lib/assets/arrows/two.png?preset=hd&srcset';
    import arrow3 from '$lib/assets/arrows/three.png?preset=hd&srcset';


    export let login: string | null;
</script>

<Hero>
    <slot slot="left">
        <h1 class="text-9xl font-bold tracking-tight max-w-2xl">
            AI-powered code review
        </h1>

        <h1 class="max-w-lg text-3xl font-bold leading-relaxed">
            Increase your engineering <span class="text-orange-600">velocity</span> and <span class="text-orange-600">quality</span>
        </h1>

        <p class="text-gray-600 max-w-lg font-light leading-relaxed">
            Codeball finds bugs in your Pull Requests, lets you ship faster and with higher confidence.
            The Codeball AI is trained on millions of code contributions to recognize risky code changes.
        </p>

        <div class="inline-flex items-center space-x-2">
            <Button color="orange" href="/approver" event="umami--click--index-get-started">
                Get started
            </Button>
            <Button color="violet" href="/approver" event="umami--click--try-the-demo">
                Try the demo
            </Button>
        </div>

        <Logos/>
    </slot>
</Hero>

<div class="flex flex-col items-center my-8">
    <h2 class="text-md uppercase text-gray-500">How it works</h2>
</div>

<div class="flex flex-col items-center gap-32 px-4 md:px-24">

    <div class="flex w-full items-start flex-row-reverse gap-8">
        <div class="w-1/3 flex gap-2 items-start flex-col justify-center ">
            <div class="text-4xl">☁️</div>
            <div class="text-lg text-slate-600 font-light">Add the Codeball GitHub Action</div>
        </div>
        <div class="flex-1 rounded-xl flex justify-end"></div>
    </div>

    <div class="h-[10rem]">
        <img srcset={arrow1} class="h-full w-full hidden md:block  -rotate-[15deg]"/>
    </div>

    <div class="justify-start  flex-col md:flex-row flex w-full items-start gap-16">
        <div class="md:w-1/3 flex gap-2 flex-col md:items-end justify-center">
            <div class="text-4xl">🧠️</div>
            <div class="text-lg text-slate-600 font-light">Codeball evaluates new Pull Requests</div>
        </div>
        <div class="flex-1 mb-32">
            <Animation/>
        </div>
    </div>

    <img srcset={arrow2} class="h-32 mt-8 -mb-8 -ml-[50rem] rotate-[30deg]"/>

    <div class="flex w-full items-start flex-row-reverse gap-8">
        <div class="w-1/3 flex gap-2 items-start flex-col justify-center ">
            <div class="text-4xl">👋️</div>
            <div class="text-lg text-slate-600 font-light">Codeball notifies you about new problems and risks</div>
        </div>
        <div class="flex-1  rounded-xl flex justify-end"></div>
    </div>

    <img srcset={arrow3} class="h-12 rotate-[160deg]"/>

    <div class="flex w-full items-start gap-8">
        <div class="w-1/3 flex gap-2 items-end flex-col justify-center ">
            <div class="text-4xl">✅</div>
            <div class="text-lg text-slate-600 font-light text-right">Auto-approve safe PRs or enforce extra review on the risky
                ones &mdash;
                You decide!
            </div>
        </div>
        <div class="flex-1  rounded-xl flex justify-end"></div>
    </div>

</div>

<div class="mt-[100rem]">
    <div>

        <h2 class="text-3xl font-bold">How it works</h2>

        <ul class="flex flex-col gap-2 text-gray-800">

            <li class="inline-flex items-center gap-4">
                <div class="text-2xl">☁️</div>
                <div class="font-medium">Add the Codeball GitHub Action</div>
            </li>

            <li class="inline-flex items-center gap-4">
                <div class="text-2xl">🧠️</div>
                <div class="font-medium">New Pull Requests are evaluated</div>
            </li>

            <li class="inline-flex items-center gap-4">
                <div class="text-2xl">🏎</div>
                <div class="font-medium">Auto-approve safe PRs or enforce extra review on risky ones — you decide</div>
            </li>

            <li class="inline-flex items-center gap-4">
                <div class="text-2xl">🧑‍💻️</div>
                <div class="font-medium">
                    Supports Python, JS, TypeScript, Go, C++, Java, C#, Ruby, and more...
                </div>
            </li>
        </ul>

        <div class="inline-flex items-center space-x-2">
            <Button color="orange" href="/approver" event="umami--click--index-get-started"
            >Get started
            </Button
            >
            <Button color="violet" href="/approver" event="umami--click--try-the-demo"
            >Try the demo
            </Button
            >
        </div>
        <div class="inline-flex space-x-2">
            <span>Need enterprise support?</span>
            <a
                    class="umami--click--schedule-a-call inline-flex items-center space-x-1 text-orange-500"
                    href="https://calendly.com/kiril-videlov/30-min-codeball?month=2022-08"
            >
                <span> Schedule a call </span>
                <CalendarDaysMini/>
            </a>
        </div>

        <Logos/>
    </div>
</div>

<div class="flex w-full flex-col items-center overflow-hidden bg-orange-50 pt-16">
    <div class="flex w-full justify-around px-8">
        <div class="w-full max-w-7xl space-y-4 text-lg">
            <h2 class="text-5xl font-bold text-gray-800">
                Avoid reckless merging, Codeball identifies and labels risky PRs
            </h2>
            <p class="max-w-3xl text-gray-600">
                Codeball is an AI model trained on millions of code contributions to distinguish<br/>
                between safe and risky code changes.<br/>
                <br/>
                It augments your development process by risk scoring your<br/>
                Pull Requests. Ship faster and with fewer faults with actionable
                <br/>and team-specific code insights.
            </p>

            <h2 class="max-w-3xl pt-16 text-5xl font-bold text-gray-800">
                Skip code review, <br/>
                Codeball approves<br/>
                your <span class="text-gray-400">(good)</span> PRs!
            </h2>
            <p class="max-w-3xl text-gray-600">
                Feeling confident and prioritising<br/>getting-shit-done?<br/>
                <br/>
                Setup Codeball to automatically approve good PRs,<br/>
                without having to wait for review.
            </p>
        </div>
    </div>

    <img
            class="select-none opacity-50 md:-mt-[6rem] lg:-mr-[54rem] lg:-mt-[40rem] xl:-mr-[36rem]"
            width="1024"
            height="914"
            srcset={armadilloAtTheComputerHD}
    />
</div>

<FeatureList>
    <FeatureBox title="Codeball Approver" srcset={armadilloCoffee}>
        <slot slot="content">
            <p>
                Approver uses advanced Artificial Intelligence to grade Pull Requests, and will approve Pull
                Requests that it's really-really confident in. Approver can reduce the time your teams
                spends on waiting for review by over 60%.
            </p>
            <p>
                The Approver is easy to add to any GitHub repository, with a single click installation using
                GitHub Actions.
            </p>
        </slot>
        <div slot="action">
            <Button color="violet" href="/approver" event="umami--click--index-approver-set-up">
                Set up
            </Button>
        </div>
    </FeatureBox>

    <FeatureBox title="Really fast, running on GitHub Actions" srcset={armadilloTrackAndField}>
        <slot slot="content">
            <p>
                All of our tools runs on GitHub Actions, making it easy as <strong>⌘+V</strong> to setup, and
                integrates nicely with your existing suite CI/CD, and gives you full configuration for how to
                integrate our tools into your stack.
            </p>
        </slot>
        <div slot="action">
            <Button
                    color="violet"
                    href="https://github.com/sturdy-dev/codeball-action"
                    event="umami--click--runs-on-actions-set-up">Set up
            </Button
            >
        </div>
    </FeatureBox>

    <FeatureBox title="Not a dashboard" srcset={armadilloGraph}>
        <slot slot="content">
            <p>
                Collecting data and rendering a graph is easy &mdash; making you a better coder and
                developer is much harder. Tracking the DORA metrics? Codeball will improve your metrics from
                day one.
            </p>
        </slot>
        <div slot="action">
            <Button color="violet" href="/dora" event="umami--click--index-dora">Read more</Button>
        </div>
    </FeatureBox>
</FeatureList>

<div class="bg-black py-16 text-white">
    <div class="mx-auto max-w-7xl space-y-8 p-14 text-center">
        <h2 class="font-mono text-5xl font-bold">I'm ready</h2>
        <Button color="black" href="/approver" event="umami--click--index-ready-lets-go">
            Let's go!
        </Button>
    </div>
</div>
