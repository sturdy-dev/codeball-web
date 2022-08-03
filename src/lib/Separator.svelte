<script lang="ts">
    export let up = false;
</script>

<div class="h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent  -ml-40 -mr-40 rounded-md"
     class:-rotate-[4deg]={up}
     class:rotate-[4deg]={!up}
></div>