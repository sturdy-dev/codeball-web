<script lang="ts" context="module">
    import type {Load} from '@sveltejs/kit';

    export const load: Load = async ({stuff: {login}}) => ({
        props: {login: login ?? null}
    });
</script>

<script lang="ts">
    import {FakePulls, GitHubLoginButton, AnalyzeForm, Logos} from '$lib/components/index';
    import Button from '$lib/Button.svelte';
    import Separator from '$lib/Separator.svelte';

    export let login: string | null;
</script>

<article class="font-mono space-y-16 mb-32">
    <h1 class="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">AI-POWERED CODE REVIEW</h1>

    <div class="my-8 flex flex-col justify-between gap-16 lg:flex-row">
        <div class="flex flex-col gap-8">
            <p class="text-xl text-gray-500 sm:max-w-xl">
                Codeball approves Pull Requests that a human would have approved. Wait less for review, save
                time and money.
            </p>

            <div class="flex flex-col gap-2">
                <p class="text-md text-gray-500">Try it on your repo!</p>
                <AnalyzeForm/>
            </div>

            <GitHubLoginButton showText={true} {login}/>

            <Logos/>

            <div class="flex flex-col items-center gap-4 md:flex-row">
                <a
                        href="https://www.producthunt.com/posts/codeball?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-codeball"
                        target="_blank"
                ><img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=349391&theme=neutral"
                        alt="Codeball - AI&#0032;code&#0032;review&#0044;&#0032;wait&#0032;less&#0032;for&#0032;review&#0044;&#0032;save&#0032;time&#0032;and&#0032;money | Product Hunt"
                        style="width: 250px; height: 54px;"
                        width="250"
                        height="54"
                /></a
                >

                <iframe
                        src="https://ghbtns.com/github-btn.html?user=sturdy-dev&repo=codeball-action&type=star&count=true&size=large"
                        frameborder="0"
                        scrolling="0"
                        width="170"
                        height="30"
                        title="Star codeball-action on GitHub"
                />
            </div>
        </div>

        <div class="hidden w-[24rem] lg:block">
            <FakePulls/>
        </div>
    </div>


    <Separator up="{true}"/>

    <div class="flex items-center gap-16 justify-around">
        <div class="space-y-4">
            <h1 class="text-6xl font-black tracking-tight font-mono"><span class="text-orange-600">Not</span> a
                dashboard</h1>
            <p class="lg:max-w-[24rem] space-y-4 text-gray-700 text-lg">Tracking the DORA metrics? Codeball will improve
                your metrics from day one.</p>
            <Button href="/dora">Learn more</Button>
        </div>
        <div class="bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4 rounded-xl shadow-x h-80 ">
            <img alt="Graph of improved lead times after installing Codeball" src="./dora-lead-times.png" height="1080" width="1920" class="h-full w-full"/>
        </div>
    </div>

    <Separator />

    <div class="flex items-center gap-16 justify-around flex-row-reverse">
        <div class="space-y-4">
            <h1 class="text-6xl font-black tracking-tight font-mono"><span class="text-orange-600">Real</span>-world-impact
            </h1>
            <p class="lg:max-w-[24rem] space-y-4 text-gray-700 text-lg">
                Codeball instantly reduces your code review workload by up to 25%.
            </p>
            <Button href="https://github.com/sturdy-dev/codeball-action">Add the GitHub Action</Button>
        </div>
        <img alt="Codeball will have the same impact to your productivity as a large meteorite will have chance of disrupting our lives if it where to hit Earth (a.k.a, very likely)" src="./impact.png" class="h-80"/>
    </div>

</article>
