<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ stuff: { login } }) => ({
		stuff: { title: 'Dashboard' },
		props: { login }
	});
</script>

<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';
	export let login: string | null;
</script>

<Dashboard {login} />
