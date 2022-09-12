import { get } from '$lib/github';
import { NotFoundError } from '$lib/api';
import type { LayoutLoad } from '@sveltejs/kit';

throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export const load: LayoutLoad = async () =>
	get()
		.then(({ login }) => login)
		.catch((err) => {
			if (err instanceof NotFoundError) {
				return undefined;
			}
			throw err;
		})
		.then((login) => ({
			stuff: {
				title: 'Codeball | AI-powered code review',
				description: 'AI-powered code review',
				ogimage: 'https://codeball.ai/og-image.png',
				login
			},
			props: { login }
		}));
