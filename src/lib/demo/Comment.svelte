<script lang="ts">
	import type { Comment } from './file';
	import { DIFF_INSERT, DIFF_DELETE } from 'diff-match-patch';
	import Spinner from '$lib/Spinner.svelte';

	export let comment: Comment;

	let isLoading = !!comment.processing;
	comment.processing?.then(() => (isLoading = false));
</script>

<div class:loading={isLoading} class="flex w-full gap-4 px-4 py-2">
	<img
		alt={comment.author.name}
		src={comment.author.avatarUrl ?? '/avatar-unknown.png'}
		class="h-6 w-6 rounded-full border-2"
	/>
	<div class="flex w-full flex-col gap-2">
		<div>
			<span class="font-semibold">{comment.author.name}</span>
			{#if comment.isOutdated}
				<span class="rounded-lg bg-orange-200 px-1 text-sm">outdated</span>
			{/if}
		</div>
		{#await comment.text}
			<Spinner />
		{:then text}
			{#if Array.isArray(text)}
				<div class="grid font-mono">
					{#each text as [op, text]}
						<span
							class="whitespace-pre-wrap"
							class:bg-red-100={op === DIFF_DELETE}
							class:bg-green-100={op === DIFF_INSERT}>{text}</span
						>
					{/each}
				</div>
			{:else}
				<pre class="w-full">{text}</pre>
			{/if}
		{/await}
	</div>
</div>

<style>
	.loading {
		border: 2px solid black;
		resize: both;
		border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 5s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23c05c7e' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23c05c7e' /%3E%3Cstop offset='100%25' stop-color='%23c05c7e' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E")
			1;
	}
</style>
