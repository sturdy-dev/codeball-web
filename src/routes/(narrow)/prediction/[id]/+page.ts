import type { PageLoad } from '@sveltejs/kit';
import { get, type Job } from '../../../../lib/jobs';
throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export const load: PageLoad = async ({ params }) => ({
	status: 200,
	props: { job: await get(params.id) }
});
