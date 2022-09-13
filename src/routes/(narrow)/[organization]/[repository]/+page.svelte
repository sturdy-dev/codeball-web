<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';
	import { page } from '$app/stores';
	const { organization, repository } = $page.params;

	export let data;
</script>

<Dashboard {organization} {repository} login={data.login} />
