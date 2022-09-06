<script lang="ts">
    import type {findable} from "./types";
	export let target: findable;
	$: bg = target.done ? target.bg : ''
</script>

<span class="transition-bg rounded-sm px-2 py-0.5 duration-200 {bg}"><slot /></span>