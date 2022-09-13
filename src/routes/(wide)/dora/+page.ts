import type { PageLoad } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	return {
		...parentData,
		meta: {
			...parentData.meta,
			title: 'Codeball – Actually improve your DORA metrics'
		}
	};
};
