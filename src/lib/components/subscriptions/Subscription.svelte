<script lang="ts">
	import ManageButton from './ManageButton.svelte';
	import { list, type Subscription } from '$lib/subscriptions';
	import Spinner from '$lib/Spinner.svelte';
	import SubscribeButton from './SubscribeButton.svelte';
	export let organization: string;

	const subscriptionFor = (organization: string) => (subscription: Subscription) =>
		!subscription.deleted_at && subscription.github_organization === organization;

	const subscription = list().then(({ subscriptions }) =>
		subscriptions.find(subscriptionFor(organization))
	);
</script>

{#await subscription}
	<Spinner />
{:then subscription}
	{#if subscription}
		<ManageButton />
	{:else}
		<SubscribeButton {organization} />
	{/if}
{/await}
