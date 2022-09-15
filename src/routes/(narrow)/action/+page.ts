import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	return {
		...parentData,
		meta: {
			...parentData.meta,
			title: 'Codeball Action',
			description: 'Learn how to use and configure the Codeball GitHub Action'
		}
	};
};
