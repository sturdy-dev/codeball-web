import type { PageLoad } from '@sveltejs/kit';

export const load: PageLoad = ({ params: { organization }, stuff: { login } }) => ({
	stuff: { title: organization },
	props: { login, organization }
});
