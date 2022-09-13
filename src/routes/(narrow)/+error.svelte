<script lang="ts">
	export let title: string;
	export let message: string | null = null;
</script>

<div class="flex flex-col items-center justify-around">
	<h1 class="p-2 text-lg font-semibold">{title}</h1>
	{#if message}
		<p>{message}</p>
	{/if}
</div>
