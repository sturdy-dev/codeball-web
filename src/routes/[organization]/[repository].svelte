<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { get, type Preference } from '$lib/preferences';

	export const load: Load = ({ params: { organization, repository }, stuff: { login }, fetch }) =>
		get({ organization, repository }, { fetch }).then((preference) => ({
			stuff: { title: `${organization}/${repository}` },
			props: { login, preference }
		}));
</script>

<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';
	import { page } from '$app/stores';
	export let login: string | null;
	export let preference: Preference | null;
	const { organization, repository } = $page.params;
</script>

<Dashboard {organization} {repository} {login} {preference} />
