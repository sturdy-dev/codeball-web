<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params: { organization, repository }, stuff: { login } }) => ({
		stuff: { title: `${organization}/${repository}` },
		props: { login }
	});
</script>

<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';
	import { page } from '$app/stores';
	export let login: string | null;
	const { organization, repository } = $page.params;
</script>

<Dashboard {organization} {repository} {login} />
