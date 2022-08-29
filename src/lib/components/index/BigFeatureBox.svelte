<script lang="ts">
	export let img: string | undefined;
	export let title: string;
	export let rainbow = false;
	export let reverse = false;

	$: reverseClass = reverse ? 'flex-row md:flex-row-reverse' : 'flex-row';
</script>

<div class="flex w-full flex-col items-center gap-5 rounded-xl bg-sky-50 p-8">
	<h1 class="w-full text-5xl font-bold text-gray-800">{title}</h1>

	<div class="gap-4 md:flex md:gap-8 lg:gap-16 {reverseClass} items-start">
		{#if img && rainbow}
			<div
				class="shadow-x float-left m-4 rounded-xl bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4 md:float-none md:m-0 "
			>
				<img src={img} height="1080" width="1920" />
			</div>
		{:else if img}
			<img
				src={img}
				class="float-left m-4 max-w-[8rem] flex-shrink-0 md:float-none md:m-0 md:max-w-[12rem] lg:max-w-[14rem]"
			/>
		{/if}

		<div class="flex-0 prose max-w-7xl space-y-4 text-gray-600">
			<slot name="content">??</slot>
		</div>
	</div>
</div>
