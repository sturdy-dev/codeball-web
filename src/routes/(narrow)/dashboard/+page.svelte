<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Dashboard login={data.login} />
