<script lang="ts">
	export let file;
	export let lines;
	import Comments from './Comments.svelte';
</script>

<div class="mt-16 flex-1 border-black lg:mt-0 lg:border-2  lg:shadow-lg">
	<div class="flex hidden space-x-2 border-b-2 border-black p-4 lg:block">
		<div class="space-y-2">
			<div class="flex space-x-2">
				<div class="h-3 w-3 rounded-full bg-red-600" />
				<div class="h-3 w-3 rounded-full bg-yellow-600" />
				<div class="h-3 w-3 rounded-full bg-green-600" />
			</div>
			<div class="flex items-center space-x-2">
				<div class="text-2xl">&larr;</div>
				<div class="text-2xl">&rarr;</div>
				<div class="text-2xl">🏠</div>
				<div class="px-2">https://codehub.com/FancyStartup/EpicProject/pulls/1337</div>
			</div>
		</div>
	</div>
	<div class="lg:p-4">
		<div class="text-4xl">
			<span class="text-black">Adding code</span>
			<span class="text-gray-800">#1337</span>
		</div>
		<div class="flex items-center space-x-2">
			<div class="test-green-700 rounded-xl bg-green-200 px-4 py-1">Open</div>
			<div>
				HappyCoder wants to merge <code class="text-blue-800">more-stuff</code> into
				<code class="text-blue-800">main</code>
			</div>
		</div>

		<div class="mt-8 overflow-hidden rounded-lg border-2 border-gray-300">
			<div class="border-b-2 border-gray-400 bg-gray-200 py-2  px-4 font-mono">
				{file.name}
			</div>
			<div>
				{#each lines as line}
					<div class="flex font-mono">
						<div class="w-16 flex-shrink-0 select-none bg-green-300 px-2 text-right text-gray-800">
							{line.num}
						</div>
						<div class="flex-1 whitespace-pre bg-green-200 px-2">{line.text}</div>
					</div>
					{#if line.comments.length > 0}
						<Comments comments={line.comments} />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
