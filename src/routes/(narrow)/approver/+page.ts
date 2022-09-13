import type { PageLoad } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	return {
		...parentData,
		meta: {
			...parentData.meta,
			title: 'Codeball Approver',
			description: 'Learn about risks in Pull Requests, and fast track and auto-approve safe PRs'
		}
	};
};
