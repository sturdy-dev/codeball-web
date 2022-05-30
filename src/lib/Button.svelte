<script lang="ts">
	export let disabled: Boolean = false;
	export let href: string | undefined = undefined;
</script>

{#if href}
	<a
		{href}
		class:bg-stone-100={disabled}
		class:border-black={disabled}
		class:text-black={disabled}
		class:bg-black={!disabled}
		class:border-transparent={!disabled}
		class:text-white={!disabled}
		class="group relative inline-flex items-center justify-center 
	border-2 border-solid  py-2 px-4 text-sm font-medium hover:bg-gray-700
	hover:text-white focus:outline-none
	focus:ring-2 focus:ring-blue-500
	focus:ring-offset-2 disabled:bg-blue-400"
	>
		<slot />
	</a>
{:else}
	<button
		type="submit"
		class:bg-stone-100={disabled}
		class:border-black={disabled}
		class:text-black={disabled}
		class:bg-black={!disabled}
		class:border-transparent={!disabled}
		class:text-white={!disabled}
		class="group relative inline-flex items-center justify-center 
	border-2 border-solid  py-2 px-4 text-sm font-medium hover:bg-gray-700
	hover:text-white focus:outline-none
	focus:ring-2 focus:ring-blue-500
	focus:ring-offset-2 disabled:bg-blue-400"
	>
		<slot />
	</button>
{/if}
