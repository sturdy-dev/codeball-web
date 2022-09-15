<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';
	import { page } from '$app/stores';
	const { organization, repository } = $page.params;
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Dashboard {organization} {repository} login={data.login} />
