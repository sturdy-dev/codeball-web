<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle, XCircle } from '@steeze-ui/heroicons';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Spinner from '$lib/Spinner.svelte';
	import { generate as randomName } from './randomName';
	import { generate as randomTitle } from './randomPRTitle';

	const fakePR = (params?: { delay: number }) => ({
		id: 1 + Math.floor(Math.random() * 98),
		running: new Promise((resolve) => setTimeout(resolve, params?.delay ?? 0)),
		isApproved: Math.random() > 0.33,
		author: randomName(),
		title: randomTitle()
	});

	const prs = writable([fakePR(), fakePR(), fakePR(), fakePR()]);

	const shiftPRs = () => {
		$prs = [fakePR({ delay: 700 + Math.floor(Math.random() * 1000) }), ...$prs.slice(0, -1)];
		setTimeout(shiftPRs, 1500 + Math.floor(Math.random() * 2000));
	};

	onMount(shiftPRs);
</script>

<section class="flex flex-col gap-4">
	{#each $prs as { id, running, isApproved, author, title }}
		<div class="flex gap-2">
			<span class="mt-0.5">
				{#await running}
					<Spinner class="h-4 w-4" />
				{:then}
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
