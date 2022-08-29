<script lang="ts">
	export let img: string;
	export let title: string;
</script>

<div
	class="flex items-center gap-8 rounded-xl bg-violet-100  p-4 lg:mx-0 lg:w-full lg:gap-16 lg:p-8"
>
	<img src={img} class="h-40 flex-shrink-0" />

	<div class="flex flex-col items-end gap-4 lg:flex-row lg:items-center lg:gap-16">
		<div class="flex flex-col gap-2 text-sm text-gray-700">
			<h2 class="text-xl font-normal tracking-tight text-black">{title}</h2>
			<slot name="content">??</slot>
		</div>
		<div class="flex-shrink-0 md:w-32 md:text-center">
			<slot name="action">??</slot>
		</div>
	</div>
</div>
