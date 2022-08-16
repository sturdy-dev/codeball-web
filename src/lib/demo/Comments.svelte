<script lang="ts">
	import { onMount } from 'svelte';
	import Spinner from '$lib/Spinner.svelte';

	export let comments;

	let show = false;
	onMount(() => {
		setTimeout(() => {
			show = true;
		}, 1000);
	});
</script>

<div class="p-2">
	<div class="space-y-4 rounded-lg border-2 border-gray-300 p-2">
		{#each comments as comment}
			<div class="flex flex-row space-x-4">
				{#if comment.isCodeball}
					<img
						src="https://avatars.githubusercontent.com/u/75087565?s=96&v=4"
						class="h-8 w-8 rounded-full border-2"
					/>
				{:else}
					<img
						src="https://avatars.githubusercontent.com/u/46955155?v=4"
						class="h-8 w-8 rounded-full border-2"
					/>
				{/if}
				<div class="space-y-2 overflow-hidden">
					<div class="flex items-center space-x-2">
						<div>{comment.username}</div>
						<div class="text-gray-600">now</div>
					</div>
					<div class="font-sans">
						{#if comment.isCodeball && !show}
							<div class="p-4">
								<Spinner />
							</div>
						{:else if comment.isCodeball && show}
							<div class="w-full whitespace-pre font-mono">
								{@html comment.html}
							</div>
							<!--
                            <div class="flex">
                                <div class="flex-1"></div>
                                <div class="inline-block cursor-pointer hover:bg-gray-300 bg-gray-200 text-gray-600 p-1 border-2 rounded-lg">
                                    Accept suggestion
                                </div>
                            </div>
                            -->
						{:else}
							{comment.text}
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
