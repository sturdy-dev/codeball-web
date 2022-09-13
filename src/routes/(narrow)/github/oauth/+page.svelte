<script lang="ts">
	import { BASE_URL } from '$lib/api';
	import { goto } from '$app/navigation';
	import Spinner from '$lib/Spinner.svelte';

	const validateParams = async () => {
		const urlParams = new URLSearchParams(window.location.search);

		const error = urlParams.get('error');
		if (error) {
			throw new Error(error);
		}

		const redirect = urlParams.get('redirect');

		const doneFromBackend = !!urlParams.get('done');
		const doneFromGitHub = !!urlParams.get('setup_action');
		const done = doneFromBackend || doneFromGitHub;

		const nextUrl = done
			? redirect ?? '/'
			: `${BASE_URL}/github/oauth?redirectUrl=${encodeURIComponent(window.location.href)}`;

		goto(nextUrl);
	};
</script>

<section class="m-auto">
	{#await validateParams()}
		<Spinner />
	{:then}
		<Spinner />
	{:catch err}
		<p>{err.message}</p>
	{/await}
</section>
