import type { PageLoad } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	return {
		...parentData,
		meta: {
			...parentData.meta,
			title: 'Launching: Codeball 1.0'
		}
	};
};
