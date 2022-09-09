<script lang="ts">
	export let pill;
	export let title;
</script>

<div class="flex flex-col items-center gap-4 ">
	<slot name="header" />

	<span class="rounded-xl bg-orange-100 px-4 py-1 font-medium text-orange-800">{pill}</span>
	<div class="text-4xl font-extrabold text-slate-800">{title}</div>

	<p class="w-full font-light leading-relaxed text-slate-600 md:max-w-lg md:text-center">
		<slot name="text" />
	</p>

	<slot name="extra" />
</div>
