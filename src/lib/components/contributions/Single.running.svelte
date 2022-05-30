<script lang="ts">
	import Spinner from '$lib/Spinner.svelte';
</script>

<div class="flex justify-around">
	<div class="flex flex-col">
		<div class="inline-flex items-center text-2xl text-gray-700">
			<Spinner />
			<span>chrunching the numbers...</span>
		</div>
		<div class="text-center"><span>[this might take a while]</span></div>
	</div>
</div>
