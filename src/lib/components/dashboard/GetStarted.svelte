<script lang="ts">
	import Button from '$lib/Button.svelte';
	import UpdateAccess from '$lib/components/auth/UpdateAccess.svelte';
</script>

<div class="flex flex-col gap-8 rounded-lg bg-orange-50 p-8 font-sans">
	<div>
		<h1 class="text-2xl text-black">Let's get you started with Codeball</h1>
	</div>

	<div class="space-y-2">
		<h2 class="text-lg text-black">1. Add Codeball to your GitHub repositories</h2>
		<p>The GitHub Action is used to run all of your Codeball Jobs on new Pull Requests.</p>
		<Button color="white" href="https://github.com/marketplace/actions/codeball-ai-code-review"
			>Install the Action</Button
		>
	</div>

	<div class="space-y-2">
		<h2 class="text-lg text-black">2. Authorize the read-only app</h2>
		<p>
			This app is used to verify who you are. Install it on your repositories to see your
			repositories here on the dashboard.
		</p>
		<UpdateAccess />
	</div>
</div>
