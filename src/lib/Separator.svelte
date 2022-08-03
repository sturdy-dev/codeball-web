<script lang="ts">
    export let up = false;
    $: rotate = up ? "-rotate-[4deg]" : "rotate-[4deg]";
</script>

<div class="{'h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent -ml-40 -mr-40 rounded-md ' + rotate}"></div>