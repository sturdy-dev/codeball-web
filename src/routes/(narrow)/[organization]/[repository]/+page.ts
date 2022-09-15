import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params: { organization, repository } }) => {
	const parentData = await parent();

	return {
		...parentData,
		meta: {
			...parentData.meta,
			title: `${organization}/${repository}`
		}
	};
};
