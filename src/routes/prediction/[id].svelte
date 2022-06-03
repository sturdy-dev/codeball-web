<script lang="ts">
	import { Single as Job } from '$lib/components/jobs';
	import { page } from '$app/stores';
</script>

<div class="m-auto flex max-w-6xl flex-col justify-around">
	<Job id={$page.params.id} />
	<div class="mt-8 flex justify-around font-mono">
		<ul class="flex gap-2">
			<li>[<a href="/faq">faq</a>]</li>
			<li>[<a href="/how">how</a>]</li>
		</ul>
	</div>
</div>
