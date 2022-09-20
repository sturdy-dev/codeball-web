<script lang="ts">
    import type {BugFixingCommit, CommitMeta} from "./types";
    import Fix from "./Fix.svelte";

    export let bics: BugFixingCommit[];
    export let commits: Record<string, CommitMeta>;

</script>

<div class="space-y-8">
    {#each bics as bic}
        <Fix {bic} {commits}/>
    {/each}
</div>
