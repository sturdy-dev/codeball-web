<script lang="ts">
	export let seconds: number;

	$: minutes = seconds / 60;
	$: hours = minutes / 60;
</script>

{#if hours > 2}
	<span class="text-2xl text-white md:text-6xl">{hours.toFixed(1)}</span><span>h</span>
{:else if minutes > 0}
	<span class="text-2xl text-white md:text-6xl">{minutes.toFixed(0)}</span><span>min</span>
{:else}
	<span class="text-2xl text-white md:text-6xl">???</span><span />
{/if}
