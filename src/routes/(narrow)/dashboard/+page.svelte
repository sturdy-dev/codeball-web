<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { Dashboard } from '../../../lib/components/dashboard';
	export let login: string | null;
</script>

<Dashboard {login} />
