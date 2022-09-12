<script lang="ts" context="module">
	throw new Error("@migration task: Replace error load function (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3293209)");

	// import { BadRequestError, NotFoundError, Unauthorized } from '$lib/api';
	// import type { Load } from '@sveltejs/kit';

	// export const load: Load = ({ error, status }) => {
	// 	console.error(error);
	// 	if (error?.name === Unauthorized.name) return { props: { title: 'Unauthorized' } };
	// 	if (error?.name === NotFoundError.name) return { props: { title: 'Not Found' } };
	// 	if (error?.name === BadRequestError.name)
	// 		return { props: { title: 'Bad Request', message: error.message } };
	// 	if (status === 404) return { props: { title: 'Page not found' } };
	// 	if (status === 500) return { props: { title: 'Internal server error' } };
	// 	return { props: { title: `${status}`, message: error?.message } };
	// };
</script>

<script lang="ts">
	export let title: string;
	export let message: string | null = null;
</script>

<div class="flex flex-col items-center justify-around">
	<h1 class="p-2 text-lg font-semibold">{title}</h1>
	{#if message}
		<p>{message}</p>
	{/if}
</div>
