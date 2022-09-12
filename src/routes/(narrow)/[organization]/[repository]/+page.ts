import type { PageLoad } from '@sveltejs/kit';

throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
throw new Error("@migration task: Check if you need to migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export const load: PageLoad = ({ params: { organization, repository }, stuff: { login } }) => ({
	stuff: { title: `${organization}/${repository}` },
	props: { login }
});
