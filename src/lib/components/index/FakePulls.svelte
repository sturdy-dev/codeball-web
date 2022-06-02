<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle, XCircle } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Spinner from '$lib/Spinner.svelte';
	import { open, fakePR } from './pullsstream';

	const prs = writable([fakePR(), fakePR(), fakePR(), fakePR()]);
	onMount(async () => {
		const stream = open();
		while (true) {
			$prs = [await stream.next(), ...$prs.slice(0, -1)];
		}
	});
</script>

<section class="flex flex-col gap-4">
	{#each $prs as { id, running, author, title }}
		<div class="flex gap-2">
			<span class="mt-0.5">
				{#await running}
					<Spinner class="h-4 w-4" />
				{:then isApproved}
					{#if isApproved}
						<Icon src={CheckCircle} solid class="h-4 w-4 text-green-600" />
					{:else}
						<Icon src={XCircle} solid class="h-4 w-4 text-gray-600" />
					{/if}
				{/await}
			</span>
			<span>
				<span class="text-sm line-clamp-1">
					#{id}: {title}
				</span>
				<span class="text-xs text-gray-600">
					by {author}
				</span>
			</span>
		</div>
	{/each}
</section>
