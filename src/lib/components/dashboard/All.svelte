<script lang="ts">
	import { isPublic as isJobPublic, list, type Job } from '$lib/jobs';
	import { Jobs, Stats, OrganisationPicker } from '$lib/components/dashboard';

	export let jobs: Job[] = [];
</script>

<Stats {jobs} />
<div class="flex space-x-2">
	<div class="flex flex-col space-y-2">
		<OrganisationPicker {jobs} />

		<div class="flex flex-col space-y-2">
			<div class="bg-gray-900 p-3 text-center text-sm font-semibold text-white">MORE</div>
			<a href="/subscriptions">[manage subscriptions]</a>
		</div>
	</div>

	<div class="grow">
		<Jobs {jobs} />
	</div>
</div>
