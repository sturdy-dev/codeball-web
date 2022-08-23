<script lang="ts">
	import Spinner from '$lib/Spinner.svelte';
	import type { Comment } from './file';

	export let comment: Comment;
</script>

<div class="flex w-full gap-4 px-4 py-2">
	<img
		alt={comment.author.name}
		src={comment.author.avatarUrl ?? '/avatar-unknown.png'}
		class="h-6 w-6 rounded-full border-2"
	/>
	<div class="flex w-full flex-col gap-2">
		<div>
			<span class="font-semibold">{comment.author.name} </span>
			{#if comment.isOutdated}
				<span class="rounded-lg bg-orange-200 px-1 text-sm">outdated</span>
			{/if}
		</div>
		{#await comment.text}
			<Spinner />
		{:then text}
			<pre class="w-full">{text}</pre>
		{/await}
	</div>
</div>
