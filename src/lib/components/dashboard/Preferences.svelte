<script lang="ts">
	import { get, set, type SafetyLevel } from '$lib/preferences';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	export let organization: string;
	export let repository: string;

	const selected = writable(-1);

	onMount(() => get({ organization, repository }).then(({ safety }) => ($selected = safety)));

	const update = (safety: SafetyLevel) => () =>
		set({ organization, repository, safety }).then(({ safety }) => ($selected = safety));
</script>

<div>
	<p class="font-semibold">How should Codeball act on this repo?</p>
	<div class="gap-4">
		<div
			class="flex items-center gap-2"
			title="Codeball will use an increased confidence threshold resulting in less approved PRs and less false-positive approvals"
		>
			<input
				type="radio"
				value="0"
				id="0"
				name="safety"
				checked={$selected === 0}
				on:click={update(0)}
			/>
			<label for="0">Extra careful</label>
		</div>
		<div
			class="flex items-center gap-2"
			title="Codeball will use default threshold level with an optimal confidence / recall ratio"
		>
			<input
				type="radio"
				value="1"
				id="1"
				name="safety"
				checked={$selected === 1}
				on:click={update(1)}
			/>
			<label for="1">Balanced</label>
		</div>
		<div
			class="flex items-center gap-2"
			title="Codeball will use a slightly lower confidence threshold resulting in more approved PRs and more false-positive approvals"
		>
			<input
				type="radio"
				value="2"
				id="2"
				name="safety"
				checked={$selected === 2}
				on:click={update(2)}
			/>
			<label for="2">Slightly more reckless</label>
		</div>
	</div>
</div>
