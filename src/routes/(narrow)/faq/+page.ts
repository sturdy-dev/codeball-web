import type {PageLoad} from "@sveltejs/kit";

export const load : PageLoad= async ({parent}) => {
	const parentData = await parent();

	return {
		...parentData,
		meta: {
			...parentData.meta,

			title: 'FAQ',
			description: 'Questions and answers about Codeball: AI Powered Code Review'
		}
	};
};
