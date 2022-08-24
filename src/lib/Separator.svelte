<script lang="ts">
	export let up = false;
	export let straight = false;

	const rot = (up: boolean, straight: boolean) : string => {
		if (straight) {
			return ''
		}
		if (up) {
			return '-rotate-[4deg]'
		}
		return 'rotate-[4deg]'
	}

	$: rotate = rot(up, straight)
</script>

<div
	class={'h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent xl:-ml-40 xl:-mr-40 rounded-md ' +
		rotate}
/>
