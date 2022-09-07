<script lang="ts">
	import type { findable } from './types';
	import { onMount } from 'svelte';
	export let target: findable;
	$: bg = target.done ? target.bg : '';

	let canAnimate = false;
	onMount(() => {
		canAnimate = !!window?.CSS?.paintWorklet;
	});
</script>

<span
	class="transition-bg  whitespace-nowrap px-2 py-0.5 duration-200 {bg}"
	class:run={target.run}
	class:found={target.show && canAnimate}
	class:foundSimple={target.show && !canAnimate}
	class:text-white={target.done}
	class:rounded-md={target.done || !canAnimate}><slot /></span
>

<style>
	@property --scanner-pos {
		syntax: '<percentage>';
		inherits: false;
		initial-value: -6%;
	}

	.found {
		--scanner-pos: 5%;
		transition: --scanner-pos 0.7s;
		transition-timing-function: ease-in-out;
		background: linear-gradient(
			90deg,
			transparent,
			transparent calc(var(--scanner-pos) - 5%),
			var(--color-gray-400) calc(var(--scanner-pos)),
			transparent calc(var(--scanner-pos) + 10px),
			transparent 100%
		);
	}

	.found.run {
		--scanner-pos: 95%;
	}

	.foundSimple {
		background-color: rgba(30, 64, 175, 0.2);
		transition: background-color 0.7s;
		transition-timing-function: ease-in-out;
	}

	.foundSimple.run {
		background-color: rgba(30, 64, 175, 0.5);
	}
</style>
