import type { PageLoad } from './$types';
import { get } from '../../../../lib/jobs';

export const load: PageLoad = async ({ params }) => ({
	status: 200,
	job: await get(params.id)
});
