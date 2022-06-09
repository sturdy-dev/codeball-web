<script lang="ts">
	export let seconds: number;

	$: minutes = seconds / 60;
	$: hours = minutes / 60;
</script>

{#if hours > 1}
	<span class="text-6xl text-white">{hours.toFixed(1)}</span><span>h</span>
{:else}
	<span class="text-6xl text-white">{minutes.toFixed(0)}</span><span>min</span>
{/if}
