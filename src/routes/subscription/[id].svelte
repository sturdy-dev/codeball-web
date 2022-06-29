<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params: { id }, stuff: { login } }) => ({
		stuff: { title: `Subscription` },
		props: { login }
	});
</script>

<script lang="ts">
	import { page } from '$app/stores';

	export let login: string | null;
	const { id } = $page.params;
	import { upcoming } from '$lib/subscriptions';

	import Spinner from '$lib/Spinner.svelte';
	import ManageButton from '../../lib/components/subscriptions/ManageButton.svelte';
	import CurrencyAmount from '../../lib/components/subscriptions/CurrencyAmount.svelte';

	const upcomingInvoice = upcoming(id);
</script>

{#await upcomingInvoice}
	<Spinner />
{:then upcomingInvoice}
	<div class="prose font-mono">
		<h1>Next invoice</h1>

		<p>
			Estimated cost:
			<CurrencyAmount
				currency={upcomingInvoice.currency}
				amount={upcomingInvoice.preliminary_amount}
			/>
		</p>

		<p>The next billing date is on {upcomingInvoice.period_end.toISOString().split('T')[0]}.</p>
		<p>
			Current usage for the period between {upcomingInvoice.period_start
				.toISOString()
				.split('T')[0]}
			and {upcomingInvoice.period_end.toISOString().split('T')[0]} is
			<strong>{upcomingInvoice.usage}</strong> users.
		</p>

		<p class="text-gray-500">
			Usage data is not updated in real-time, and might be delayed up to 24 hours.
		</p>

		<div class="mt-8">
			<ManageButton />
		</div>
	</div>
{/await}
