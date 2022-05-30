import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

import imagePresets, { densityPreset } from 'vite-plugin-image-presets';

const withRoundBorders = (image) => {
	const { width } = image.options;
	const rectFor = (width, height = width) =>
		Buffer.from(
			`<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${width}" ry="${height}"/></svg>`
		);
	return image
		.resize({ width, height: width, fit: 'cover' })
		.composite([{ input: rectFor(width), blend: 'dest-in' }]);
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				imagePresets({
					logo: densityPreset({
						class: 'img density',
						height: 16, // avoid layout shift
						baseWidth: 16,
						density: [1, 1.5, 2],
						resizeOptions: {
							fit: 'cover'
						},
						withImage: withRoundBorders,
						formats: {
							webp: { quality: 40 },
							png: { quality: 40 }
						}
					})
				})
			]
		}
	}
};

export default config;
