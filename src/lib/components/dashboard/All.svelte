<script lang="ts">
	import { isPublic as isJobPublic, list, type Job } from '$lib/jobs';
	import { Jobs, Stats, OrganisationPicker } from '$lib/components/dashboard';

	export let jobs: Job[] = [];
</script>

<Stats {jobs} />
<div class="flex space-x-2">
	<OrganisationPicker {jobs} />
	<div class="grow">
		<Jobs {jobs} />
	</div>
</div>
