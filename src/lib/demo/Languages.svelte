<script lang="js">
	import { createEventDispatcher } from 'svelte';
	import Go from '$lib/demo/Go.svelte';
	import JS from '$lib/demo/JS.svelte';
	import Java from '$lib/demo/Java.svelte';
	import Language from '$lib/demo/Language.svelte';

	const dispatch = createEventDispatcher();

	function pickLanguage(l) {
		dispatch('pickedLanguage', { selectedFile: l });
	}

	export let selectedFile;
</script>

<div>
	<div class="font-bold">Pick your language</div>
	<div class="flex space-x-4">
		<div on:click={() => pickLanguage('db.go')}>
			<Language selected={selectedFile === 'db.go'}>
				<Go />
			</Language>
		</div>
		<div on:click={() => pickLanguage('server.js')}>
			<Language selected={selectedFile === 'server.js'}>
				<JS />
			</Language>
		</div>
		<div on:click={() => pickLanguage('TechNumber.java')}>
			<Language selected={selectedFile === 'TechNumber.java'}>
				<Java />
			</Language>
		</div>
	</div>
</div>
