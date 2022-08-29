<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Codeball Approver Demo'
		}
	});
</script>

<script lang="ts">
	import { AnalyzeForm, GitHubLoginButton } from '$lib/components/index';

	export let login: string | null;
</script>

<article>
	<h1 class="text-6xl font-black tracking-tight">Codeball Approver Demo</h1>

	<div class="mt-8 flex w-full flex-col gap-4 font-mono">
		<p>Test Codeball for yourself, with the Codeball web demo</p>
		<div class="w-full lg:w-1/2">
			<AnalyzeForm />
		</div>
		<GitHubLoginButton showText={true} {login} />
	</div>
</article>
