<script context="module" lang="ts">
	export let prerender = false;

	import type { Load } from '@sveltejs/kit';
	import { list } from '$lib/subscriptions';
	import { listOrganizations } from '$lib/github';

	export const load: Load = async ({ stuff: { login }, fetch }) =>
		Promise.all([list({}, { fetch }), listOrganizations({ fetch })]).then(
			([{ subscriptions }, { organizations }]) => ({
				stuff: { title: 'Subscriptions' },
				props: {
					login,
					subscriptions,
					organizations
				}
			})
		);
</script>

<script lang="ts">
	import Button from '$lib/Button.svelte';
	import ManageButton from '$lib/components/subscriptions/ManageButton.svelte';
	import SubscribeButton from '$lib/components/subscriptions/SubscribeButton.svelte';

	import type { Subscription } from '$lib/subscriptions';
	import type { Organization } from '$lib/github';

	export let login: string | null;
	export let subscriptions: Subscription[];
	export let organizations: Organization[];

	const subscribedOrgs = new Set(subscriptions.map((s) => s.github_organization));
	const nonSubscribedOrganizations = organizations
		.map((o) => o.name)
		.filter((org) => !subscribedOrgs.has(org));
</script>

<div class="font-mono">
	<h1 class="text-4xl">Subscriptions</h1>
	<div class="mt-4 flex flex-col space-y-4">
		{#each subscriptions as { id, github_organization, customer, deleted_at }}
			<div class="flex flex-row items-center space-x-4 bg-gray-200 p-2">
				<div class="min-w-[15rem]">
					<a class="font-medium text-black" href="https://github.com/{github_organization}"
						>{github_organization}</a
					>
					<div class="text-sm text-gray-800">Managed by {customer.github_login}</div>
				</div>

				{#if deleted_at}
					<div class="flex-1">Inactive</div>
				{:else}
					<div class="flex-1">BALLER EDITION</div>
					{#if login && login === customer.github_login}
						<ManageButton />
					{/if}
					<Button href="/subscriptions/{id}">Upcoming invoice</Button>
				{/if}
			</div>
		{/each}

		{#each nonSubscribedOrganizations as organization}
			<div class="flex flex-row items-center space-x-4 bg-gray-200 p-2">
				<div class="min-w-[15rem]">
					<a class="font-medium text-black" href="https://github.com/{organization}"
						>{organization}</a
					>
				</div>
				<div class="flex-1">FREE</div>
				<SubscribeButton {organization} />
			</div>
		{/each}
	</div>
</div>
