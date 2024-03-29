<script lang="ts">
	import { fileToString, type File, type Author } from './file';
	import CommentForm from './CommentForm.svelte';
	import CommentReplyForm from './CommentReplyForm.svelte';
	import Comment from './Comment.svelte';
	import { run, type Suggestion } from './api';
	import { lineMode } from './diff';

	export let author: Author;
	export let file: File;
	export let immutable = false;

	let highlightLine = -1;
	let commentLine = -1;

	const onCommentFormClosed = () => (commentLine = -1);

	const onReplyCreated = (line: number, text: string) => {
		file = {
			...file,
			comments: file.comments.map((comment) =>
				comment.line === line
					? {
							...comment,
							replies: comment.replies.concat({
								line: comment.line,
								author,
								isOutdated: false,
								text: Promise.resolve(text),
								replies: []
							})
					  }
					: comment
			)
		};
	};

	const onSuggestionCreated = (suggestion: Suggestion) => {
		let replied = false;

		const oldLines = file.lines
			.slice(suggestion.from_line - 1, suggestion.to_line)
			.map((l) => l.text)
			.join('\n');
		const newLines = suggestion.text;
		const diffs = lineMode(oldLines, newLines);

		const codeballComment = {
			line: suggestion.from_line - 1,
			author: { name: 'Codeball', avatarUrl: '/avatar-codeball.png' },
			isOutdated: false,
			text: Promise.resolve(diffs),
			replies: []
		};

		file = {
			...file,
			comments: file.comments.map((comment) => {
				const shouldReply = comment.line === codeballComment.line;
				if (!replied && shouldReply) replied = true;
				return shouldReply
					? { ...comment, replies: comment.replies.concat(codeballComment) }
					: comment;
			})
		};

		if (!replied) file = { ...file, comments: file.comments.concat(codeballComment) };
	};

	const onCommentCreated = (line: number, text: string) => {
		let commentProcessed: () => void;
		const processing = new Promise<void>((resolve) => (commentProcessed = resolve));

		run({ input: fileToString(file), line: line + 1, comment: text })
			.then((suggestions) => suggestions.forEach(onSuggestionCreated))
			.then(() => commentProcessed());

		file = {
			...file,
			comments: file.comments.concat({
				processing,
				line,
				author,
				isOutdated: false,
				text: Promise.resolve(text),
				replies: []
			})
		};
		onCommentFormClosed();
	};
</script>

<div on:mouseout={() => (highlightLine = -1)} on:blur={() => (highlightLine = -1)}>
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

			<div
				class:opacity-0={immutable || i !== highlightLine}
				class:cursor-pointer={!immutable && i === highlightLine}
				class="z-1 relative float-left rounded-md bg-blue-300 px-1 shadow-md"
			>
				+
			</div>

			<pre class="flex-1">{text}</pre>
		</div>
		{#if !immutable && commentLine === i}
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
				<Comment {comment} />
				{#await comment.processing then}
					{#each comment.replies as reply}
						<Comment comment={reply} />
					{/each}
					{#if !immutable}
						<CommentReplyForm on:reply={(e) => onReplyCreated(i, e.detail.text)} {author} />
					{/if}
				{/await}
			</div>
		{/each}
	{/each}
</div>
