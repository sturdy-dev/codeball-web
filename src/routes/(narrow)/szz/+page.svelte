<script lang="ts">
    import Inducing from "../../../lib/szz/List.svelte";
    import type {PageData} from './$types';

    export let data: PageData;
</script>

{#await data.bics then bics}
    {#await data.commits then commits}
    <Inducing {bics} {commits} />
{/await}
{/await}