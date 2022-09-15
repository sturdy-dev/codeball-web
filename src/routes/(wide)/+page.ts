import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	return {
		...parentData,
		meta: {
			...parentData.meta,
			title: 'Codeball – AI Powered Code Review',
			description:
				'Codeball finds bugs in your Pull Requests, lets you ship faster and with higher confidence.'
		}
	};
};
