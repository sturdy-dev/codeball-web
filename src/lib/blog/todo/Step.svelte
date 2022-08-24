<script lang="ts">
	export let prompt: string;
	export let code: string;
	export let comment: string;
	export let added: number[];

	$: addedSet = new Set(added);

	$: lines = code.split('\n').map((l, idx) => {
		return {
			text: l,
			row: idx + 1,
			isAdded: addedSet.has(idx + 1)
		};
	});
</script>

<div>
	<div class="lg:sticky lg:top-5 lg:float-left lg:w-[20rem] xl:w-[30rem]">
		<code class="block border-l-4 border-black pl-2 text-xl">{prompt}</code>
		<p class="mt-4 w-4/5 text-gray-600">{@html comment}</p>
	</div>

	<div class="mt-8 lg:top-0 lg:float-right lg:mt-0 lg:w-[40rem]">
		<div class="rounded bg-stone-600 font-mono text-white">
			{#each lines as line}
				<div class="flex space-x-4" class:bg-green-700={line.isAdded}>
					<div class="w-8 flex-shrink-0 select-none text-right" class:text-green-300={line.isAdded}>
						{line.row}
					</div>
					<div class=" break-word min-w-0 flex-1 whitespace-pre-wrap">{line.text}</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="clear-both" />
</div>
