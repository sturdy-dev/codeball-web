<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/Button.svelte';
	import { create } from '$lib/jobs';

	let repoUrl = 'https://github.com/supabase/supabase';
	let className = '';

	const startJob = async () => {
		create({ url: repoUrl })
			.then(({ id }) => {
				goto(`/prediction/${id}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	export { className as class };
</script>

<form
	action="#"
	class="flex flex-col gap-2 sm:flex-row {className}"
	on:submit|stopPropagation|preventDefault={startJob}
>
	<div class="flex-1">
		<label for="hero-repo-url" class="sr-only">GitHub Repository URL</label>
		<input
			id="hero-repo-url"
			type="text"
			class="block w-full rounded-md border-2 border-black px-5 py-3 font-mono text-base text-gray-900 placeholder-stone-500 focus:outline-none"
			placeholder="Enter a repo URL"
			bind:value={repoUrl}
		/>
	</div>
	<Button color="white" disabled={repoUrl.length < 4}>Analyze</Button>
</form>
