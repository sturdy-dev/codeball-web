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
		{ src: SturdyLogo, alt: 'Sturdy', width: 95 },
		{ src: AthenianLogo, alt: 'Athenian', width: 155 },
		{ src: OryLogo, alt: 'Ory', width: 47 },
		{ src: KitemakerLogo, alt: 'Kitemaker', width: 110 },
		{ src: GogsLogo, alt: 'Gogs', width: 68 },
		{ src: MasonLogo, alt: 'Mason', width: 93 },
		{ src: EMQXLogo, alt: 'EMQX', width: 80 },
		{ src: SimplepollLogo, alt: 'Simplepoll', width: 133 }
	];
</script>

<div class="flex flex-col items-center gap-2 md:items-start">
	<span class="text-md uppercase text-gray-500">Used by hundreds of teams, including</span>

	<div class="flex flex-wrap gap-x-10 gap-y-6 grayscale">
		{#each logos as { src, alt, width }}
			<img class="mx-auto h-6 md:mx-0" {src} {alt} height="24" {width} />
		{/each}
	</div>
</div>
