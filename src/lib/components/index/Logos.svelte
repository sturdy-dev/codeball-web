<script lang="ts">
	import AthenianLogo from '$lib/assets/logo-athenian.svg';
	import SturdyLogo from '$lib/assets/logo-sturdy.svg';
	import OryLogo from '$lib/assets/logo-ory.png';
	import KitemakerLogo from '$lib/assets/logo-kitemaker.png';
	import GogsLogo from '$lib/assets/logo-gogs.png';
	import MasonLogo from '$lib/assets/logo-mason.svg';
	import EMQXLogo from '$lib/assets/logo-emqx.png';
	import SimplepollLogo from '$lib/assets/logo-simplepoll.svg';

	const logos = [
		{ src: SturdyLogo, alt: 'Sturdy' },
		{ src: AthenianLogo, alt: 'Athenian' },
		{ src: OryLogo, alt: 'Ory' },
		{ src: KitemakerLogo, alt: 'Kitemaker' },
		{ src: GogsLogo, alt: 'Gogs' },
		{ src: MasonLogo, alt: 'Mason' },
		{ src: EMQXLogo, alt: 'EMQX' },
		{ src: SimplepollLogo, alt: 'Simplepoll' }
	];
</script>

<div class="flex flex-col gap-2">
	<span class="text-md text-gray-500">Used by</span>

	<div class="flex flex-wrap gap-x-10 gap-y-6 grayscale">
		{#each logos as { src, alt }}
			<img class="h-6" {src} {alt} />
		{/each}
	</div>
</div>
