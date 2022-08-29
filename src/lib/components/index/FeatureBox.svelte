<script lang="ts">
	export let img: string;
	export let title: string;
	export let pill: string;
</script>

<div
	class="flex items-start gap-4 rounded-xl bg-violet-100 p-4 md:items-center lg:mx-0 lg:w-full lg:gap-16"
>
	<img src={img} class="h-40 flex-shrink-0 " />

	<div class="flex flex-col items-end gap-4 lg:flex-row lg:items-end lg:gap-16">
		<div class="flex flex-col gap-2 text-gray-600">
			<div class="inline-flex items-center gap-4">
				<h2 class="text-xl font-semibold text-violet-900">{title}</h2>
				{#if pill}
					<span class="rounded-lg bg-orange-300 px-2 py-0.5 text-sm text-orange-900">{pill}</span>
				{/if}
			</div>
			<slot name="content">??</slot>
		</div>
		<div class="flex-shrink-0 text-right">
			<slot name="action">??</slot>
		</div>
	</div>
</div>
