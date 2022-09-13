<script lang="ts">
	import Button from '$lib/Button.svelte';
	import ManageButton from '$lib/components/subscriptions/ManageButton.svelte';
	import SubscribeButton from '$lib/components/subscriptions/SubscribeButton.svelte';
	import GitHubLoginButton from '$lib/components/index/GitHubLoginButton.svelte';

	export let data;

	let {subscriptions, organizations} = data
	$: subscriptions =  data.subscriptions || []
	$: organizations =  data.organizations || []

	const subscribedOrgs = new Set(subscriptions.map((s) => s.github_organization));
	const nonSubscribedOrganizations = organizations
		.map((o) => o.name)
		.filter((org) => !subscribedOrgs.has(org));

	const haveAnyOrgs = subscribedOrgs.size > 0 || nonSubscribedOrganizations.length > 0;
</script>

<div class="font-mono">
	<h1 class="text-4xl">Subscriptions</h1>

	{#if !haveAnyOrgs}
		<div class="mt-4 max-w-prose space-y-4 text-gray-600">
			<p>You're not using Codeball in any repository yet.</p>

			<p>
				Start by setting up the <a
					class="text-black"
					href="https://github.com/sturdy-dev/codeball-action">[Codeball GitHub Action]</a
				>, and come back here after you've run your first job with Codeball. :-)
			</p>

			<p>Already up and running? You might need to <GitHubLoginButton login={data.login} /></p>
		</div>
	{/if}

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
					{#if data.login && data.login === customer.github_login}
						<ManageButton />
					{/if}
					<Button color="black" href="/subscriptions/{id}">Upcoming invoice</Button>
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
