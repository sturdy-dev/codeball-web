<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';
	import type { PageData } from './$types';

	export let organization: string | null;

	export let data: PageData;
</script>

<Dashboard {organization} login={data.login} />
