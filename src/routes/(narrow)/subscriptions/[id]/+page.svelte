<script lang="ts">
	import ManageButton from '$lib/components/subscriptions/ManageButton.svelte';
	import CurrencyAmount from '$lib/components/subscriptions/CurrencyAmount.svelte';

	export let data;
	let { upcomingInvoice } = data;
	$: upcomingInvoice = data.upcomingInvoice;
</script>

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
		Current usage for the period between {upcomingInvoice.period_start.toISOString().split('T')[0]}
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
