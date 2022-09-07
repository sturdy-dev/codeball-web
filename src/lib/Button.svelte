<script lang="ts">
	export let disabled = false;
	export let href: string | undefined = undefined;
	export let color: 'blue' | 'black' | 'lime' | 'violet' | 'orange' | 'white' = 'blue';
	export let event = ""; // Umami style events (example: "umami--click--signup-button")

	const calcBg = (disabled: boolean) => {
		if (color === 'blue') {
			if (disabled) {
				return 'bg-sky-300';
			}
			return 'bg-blue-500 hover:bg-blue-600';
		}
		if (color === 'orange') {
			if (disabled) {
				return 'bg-orange-300';
			}
			return 'bg-orange-500 hover:bg-orange-600';
		}
		if (color === 'lime') {
			if (disabled) {
				return 'bg-lime-200';
			}
			return 'bg-lime-500 hover:bg-lime-600';
		}
		if (color === 'violet') {
			if (disabled) {
				return 'bg-violet-200';
			}
			return 'bg-violet-500 hover:bg-violet-600';
		}
		if (color === 'black') {
			return 'bg-black hover:bg-gray-800';
		}
		if (color === 'white') {
			return 'bg-white hover:bg-gray-200';
		}
	};

	const calcText = (disabled: boolean) => {
		if (color === 'white') {
			return 'text-gray-800';
		}
		return 'text-white';
	};

	const calcBorder = (disabled: boolean) => {
		if (color === 'black') {
			return 'border-white';
		}
		if (color === 'white') {
			return 'border-black';
		}
		return 'border-transparent';
	};

	$: bg = calcBg(disabled);
	$: text = calcText(disabled);
	$: border = calcBorder(disabled);
</script>

{#if href}
	<a
		{href}
		class="text-md group relative inline-flex items-center
	justify-center whitespace-nowrap  rounded-md border-2 border-solid py-2 px-4
	focus:outline-none focus:ring-2
	focus:ring-blue-500 focus:ring-offset-2 {bg} {text} {border} {event}"
	>
		<slot />
	</a>
{:else}
	<button
		type="submit"
		class="text-md group relative inline-flex items-center
	justify-center whitespace-nowrap  rounded-md border-2 border-solid py-2 px-4
	focus:outline-none focus:ring-2
	focus:ring-blue-500 focus:ring-offset-2
		{bg} {text} {border} {event}"
	>
		<slot />
	</button>
{/if}
