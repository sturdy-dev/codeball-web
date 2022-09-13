<script lang="ts">
	import { Single } from '../../../../lib/components/jobs';

	export let data;
</script>

<div class="m-auto flex max-w-6xl flex-col justify-around">
	<Single job={data.job} />
</div>
