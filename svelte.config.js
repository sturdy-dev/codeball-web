import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		csp: {
			directives: {
				'default-src': ['self'],
				'connect-src': [
					'self',
					'api.codeball.ai',
					'umami.codeball.ai',
					'app.posthog.com',
					'vitals.vercel-insights.com'
				],
				'img-src': ['self', 'api.producthunt.com'],
				'child-src': ['self', 'ghbtns.com'],
				'script-src': ['self', 'umami.codeball.ai', 'app.posthog.com']
			}
		}
	}
};

export default config;
