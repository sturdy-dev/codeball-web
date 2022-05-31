<script lang="ts">
	import AthenianLogo from '$lib/assets/logo-athenian.svg';
	import SturdyLogo from '$lib/assets/logo-sturdy.svg';
	import OryLogo from '$lib/assets/logo-ory.png';

	const logos = [
		{ src: SturdyLogo, alt: 'Sturdy' },
		{ src: AthenianLogo, alt: 'Athenian' },
		{ src: OryLogo, alt: 'Ory' }
	];
</script>

<div class="flex flex-col gap-2">
	<span class="text-md text-gray-500">Used by</span>

	<div class="flex gap-8 grayscale">
		{#each logos as { src, alt }}
			<img class="h-6" {src} {alt} />
		{/each}
	</div>
</div>
