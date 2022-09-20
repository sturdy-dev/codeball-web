<script lang="ts">
    import type {BugFixingCommit, CommitMeta} from "./types";
    import Inducer from "./Inducer.svelte";

    export let bic: BugFixingCommit;
    export let commits: Record<string, CommitMeta>;

    $: inducerCommit = commits[bic.fix_commit_hash]
    $: href = `https://github.com/${bic.repo_name}/commit/${bic.fix_commit_hash}`
</script>

<div class="flex gap-4">
    <div class="bg-green-100 flex-1 overflow-hidden p-4 rounded-md border-2 border-green-300">
        <a class="text-gray-900" {href}>{bic.fix_commit_hash}</a><br>
        {#if inducerCommit}
            <pre class="whitespace-pre-wrap text-gray-600">{inducerCommit.message}</pre>
        {/if}
    </div>

    <div class="flex-1 w-full ">
        {#each bic.inducing_commit_hash as hash}
            <Inducer {hash} {commits} {bic}/>
        {/each}
    </div>
</div>