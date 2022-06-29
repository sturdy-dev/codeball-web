<script lang="ts">
	export let amount: number;
	export let currency: string;

	$: whole = amount > 100 ? amount.toString().substring(0, -1) : '0';
	$: sub = amount.toString().substring(-2);
</script>

{whole}.{sub}
{currency.toUpperCase()}
