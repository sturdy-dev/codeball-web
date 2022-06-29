<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff: { login } }) => ({
		stuff: { title: 'Subscriptions' },
		props: { login }
	});
</script>

<script lang="ts">
	import { list } from '$lib/subscriptions';
	import Spinner from '$lib/Spinner.svelte';
	import Button from '$lib/Button.svelte';
	import ManageButton from '$lib/components/subscriptions/ManageButton.svelte';
	import { listOrganizations } from '../lib/github';
	import { type Subscription } from '$lib/subscriptions/types';
	import { onMount } from 'svelte';
	import SubscribeButton from '../lib/components/subscriptions/SubscribeButton.svelte';

	export let login: string | null;

	let loading = true;
	let subscriptions: Subscription[] | undefined = undefined;
	let nonSubscribedOrganizations: string[] | undefined = undefined;

	const loadData = async () => {
		subscriptions = await list().then((s) => s.subscriptions);
		let organizations = await listOrganizations().then((s) => s.organizations);
		let subscribedOrgs = new Set(subscriptions.map((s) => s.github_organization));
		nonSubscribedOrganizations = organizations
			.map((o) => o.name)
			.filter((org) => !subscribedOrgs.has(org));
		loading = false;
	};

	onMount(loadData);
</script>

{#if loading}
	<Spinner />
{:else}
	<div class="font-mono">
		<h1 class="text-4xl">Subscriptions</h1>
		<div class="mt-4 flex flex-col space-y-4">
			{#each subscriptions as s}
				<div class="flex flex-row items-center space-x-4 bg-gray-200 p-2">
					<div class="min-w-[15rem]">
						<div class="font-medium text-black">{s.github_organization}</div>
						<div class="text-sm text-gray-800">Managed by {s.customer.github_login}</div>
					</div>

					{#if s.deleted_at}
						<div class="flex-1">Inactive</div>
					{:else}
						<div class="flex-1">BALLER EDITION</div>
						{#if login && login === s.customer.github_login}
							<ManageButton subscription={s} />
						{/if}
						<Button href="/subscription/{s.id}">Upcoming invoice</Button>
					{/if}
				</div>
			{/each}

			{#each nonSubscribedOrganizations as organization}
				<div class="flex flex-row items-center space-x-4 bg-gray-200 p-2">
					<div class="min-w-[15rem]">
						<div class="font-medium text-black">{organization}</div>
					</div>
					<div class="flex-1">FREE</div>
					<SubscribeButton {organization} />
				</div>
			{/each}
		</div>
	</div>
{/if}
