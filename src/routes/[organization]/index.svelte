<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params: { organization }, stuff: { login } }) => ({
		stuff: { title: organization },
		props: { login, organization }
	});
</script>

<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';

	export let login: string | null;
	export let organization: string | null;
</script>

<Dashboard {organization} {login} />
