<script lang="ts">
	export let srcset: string;
	export let title: string;
	export let pill: string | undefined = undefined;
	export let showAction = true;
</script>

<div
	class="flex items-start gap-4 rounded-xl bg-violet-100 p-4 md:items-center md:gap-8 md:p-8 lg:mx-0 lg:w-full lg:gap-16"
>
	<img {srcset} class="h-20 flex-shrink-0 md:h-40 " />

	<div class="flex w-full flex-col items-end gap-4 lg:flex-row lg:items-end lg:gap-16">
		<div class="flex w-full flex-grow flex-col gap-2 text-gray-600">
			<div class="inline-flex items-center gap-4">
				<h2 class="text-xl font-semibold text-violet-900">{title}</h2>
				{#if pill}
					<span class="rounded-lg bg-orange-300 px-2 py-0.5 text-sm text-orange-900">{pill}</span>
				{/if}
			</div>
			<slot name="content">??</slot>
		</div>
		{#if showAction}
			<div class="flex-shrink-0 text-right">
				<slot name="action" />
			</div>
		{/if}
	</div>
</div>
