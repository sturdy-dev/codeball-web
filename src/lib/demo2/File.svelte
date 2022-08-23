<script lang="ts">
	import type { File } from './file';
	import CommentForm from './CommentForm.svelte';
	import Comment from './Comment.svelte';

	export let file: File;
	export let highlightLine = -1;
	export let commentLine = -1;

	const onCommentFormClosed = () => (commentLine = -1);

	const onCommentCreated = (line: number, text: string) => {
		file = {
			...file,
			comments: file.comments.concat({
				line,
				author: { name: 'name' },
				isOutdated: false,
				text: Promise.resolve(text)
			})
		};
		onCommentFormClosed();
	};
</script>

<div
	on:mouseout={() => (highlightLine = -1)}
	on:blur={() => (highlightLine = -1)}
	class="grid overflow-hidden rounded-lg border-2 border-gray-300"
>
	{#each file.lines as { text }, i}
		<div
			class="flex font-mono"
			on:click={() => (commentLine = i)}
			on:mouseover={() => (highlightLine = i)}
			on:focus={() => (highlightLine = i)}
		>
			<div class="w-12 flex-shrink-0 select-none px-2 text-right text-gray-800">
				{i + 1}
			</div>
			<div class="flex-1 whitespace-pre px-4">{text}</div>
			<div
				class:hidden={i !== highlightLine}
				class="z-1 absolute left-16 cursor-pointer rounded-md bg-blue-300 px-1 shadow-md"
			>
				+
			</div>
		</div>
		{#if commentLine === i}
			<div class="border-y-2 border-gray-300 pl-12">
				<CommentForm
					on:close={() => onCommentFormClosed()}
					on:create={(e) => onCommentCreated(i, e.detail.text)}
				/>
			</div>
		{/if}
		{@const comments = file.comments.filter(({ line }) => line === i)}
		{#each comments as comment}
			<div class="border-y-2 border-gray-300">
				<Comment bind:comment />
			</div>
		{/each}
	{/each}
</div>
