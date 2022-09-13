<script lang="ts">
	import { Dashboard } from '$lib/components/dashboard';

	export let organization: string | null;
    export let data;
</script>

<Dashboard {organization} login={data.login} />
