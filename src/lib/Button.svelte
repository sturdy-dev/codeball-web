<script lang="ts">
	export let disabled = false;
	export let href: string | undefined = undefined;
	export let color: 'blue' | 'black' | 'lime' | 'violet' = 'blue';

	const calcBg = (disabled: boolean) => {
		if (color === 'blue') {
			if (disabled) {
				return 'bg-sky-300';
			}
			return 'bg-blue-500 hover:bg-blue-600';
		}
		if (color === 'lime') {
			if (disabled) {
				return 'bg-lime-200';
			}
			return 'bg-lime-500 hover:bg-lime-400';
		}
		if (color === 'violet') {
			if (disabled) {
				return 'bg-violet-200';
			}
			return 'bg-violet-500 hover:bg-violet-400';
		}
		if (color === 'black') {
			return 'bg-black hover:bg-gray-800';
		}
	};

	const calcText = (disabled: boolean) => {
		if (color === 'blue') {
			return 'text-white';
		}
		if (color === 'lime') {
			return 'text-white';
		}
		if (color === 'violet') {
			return 'text-white';
		}
		if (color === 'black') {
			return 'text-white';
		}
	};

	const calcBorder = (disabled: boolean) => {
		if (color === 'blue') {
			return 'border-transparent';
		}
		if (color === 'lime') {
			return 'border-transparent';
		}
		if (color === 'violet') {
			return 'border-transparent';
		}
		if (color === 'black') {
			return 'border-white';
		}
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
	focus:ring-blue-500 focus:ring-offset-2 {bg} {text} {border}"
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
		{bg} {text} {border}"
	>
		<slot />
	</button>
{/if}
