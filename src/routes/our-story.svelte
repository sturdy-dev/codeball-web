<script context="module" lang="ts">
	export const load = () => ({
		stuff: {
			title: 'Our Story'
		}
	});
</script>

<script lang="ts">
	import armadilloThumbsUpHD from '$lib/armadillo/thumbs-up.png?preset=hd&srcset';
</script>

<article class="mx-auto max-w-[70rem] space-y-48 py-32 md:px-8">
	<div class="flex flex-col justify-between gap-8 lg:flex-row">
		<h1 class="text-4xl font-medium text-gray-800">Coding should be better than this</h1>

		<div class="max-w-[30rem] space-y-6  text-justify text-gray-600">
			<p>
				We believe that programming is the best thing in the world, it's our passion, it's what we
				love. Programming is a new industry, that's in higher demand than ever. Yet, the tools and
				software we use when building software has not changed significantly in the last 10 years.
			</p>

			<p>We're here to change it.</p>
		</div>
	</div>

	<div class="flex justify-around">
		<img srcset={armadilloThumbsUpHD} width="300" />
	</div>

	<div class="flex flex-col justify-between gap-8 lg:flex-row">
		<div class="max-w-[30rem] space-y-6  text-justify">
			<h2 class="text-3xl font-medium text-gray-800">Join our mission</h2>

			<p>
				We're here to make sure that programming continues to be the best job in the world. Join our
				talented and ambitious team, and let's make our dreams come true.
			</p>
			<p class="text-black underline">
				<a href="mailto:gustav@codeball.ai">Get in touch</a>
			</p>
		</div>

		<div class="max-w-[30rem] space-y-6  text-justify text-gray-600">
			<h2 class="text-3xl font-medium">Let's hang out</h2>

			<p>
				Sturdy Sweden AB<br />
				Torsgatan 26<br />
				113 21 Stockholm<br />
				Sweden
			</p>

			<p class="text-black underline">
				<a href="mailto:gustav@codeball.ai">support@codeball.ai</a>
			</p>
		</div>
	</div>
</article>
