<script lang="ts">
	export let selected = false;
</script>

<div
	class="duration-400 h-16 w-16 cursor-pointer p-2 text-white transition-all hover:bg-gray-700 hover:text-white"
	class:bg-black={selected}
	class:shadow-lg={selected}
	class:bg-gray-300={!selected}
>
	<slot />
</div>
