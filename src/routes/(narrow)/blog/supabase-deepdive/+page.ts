import type { PageLoad } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	return {
		...parentData,
		meta: {
			...parentData.meta,
			title: 'Codeball AI Code Review, a deepdive into the numbers'
		}
	};
};
