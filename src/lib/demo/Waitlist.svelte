<script lang="ts">
	import Button from '$lib/Button.svelte';
	let email = '';
</script>

<section>
	<div class="font-bold">Request private beta access</div>
	<form action="#" class="flex max-w-3xl flex-col gap-2">
		<div class="flex-1">
			<label for="waitlist-email" class="sr-only">Your email address</label>
			<input
				id="waitlist-email"
				type="email"
				class="block w-full border-2 border-black border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-stone-500 focus:outline-none"
				placeholder="Your email address"
				bind:value={email}
			/>
		</div>
		<Button disabled={email.length < 3}>Request</Button>
	</form>
</section>
