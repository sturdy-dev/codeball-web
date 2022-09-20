<script lang="ts">
    import type { CommitMeta, BugFixingCommit} from "./types";

    export let hash: string;
    export let bic: BugFixingCommit;
    export let commits: Record<string, CommitMeta>;

    $: commit = commits[hash]
    $: href = `https://github.com/${bic.repo_name}/commit/${hash}`
</script>

<div class="bg-red-100 w-full overflow-hidden p-4 rounded-md border-2 border-red-300">
    <a class="text-gray-900" {href}>{hash}</a><br>
    {#if commit}
        <pre class="whitespace-pre-wrap text-gray-600">{commit.message}</pre>
    {/if}
</div>