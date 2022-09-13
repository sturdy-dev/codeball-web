import type { PageLoad } from '@sveltejs/kit';
import { upcoming } from '../../../../lib/subscriptions';

export const prerender = false;

// TODO: Figure out how to render on the server
export const ssr = false;

export const load: PageLoad = async ({ parent, fetch, params: { id } }) => {
	const parentData = await parent();

	return {
		...parentData,

		meta: {
			...parentData.meta,
			title: 'Subscriptions'
		},

		upcomingInvoice: await upcoming(id, { fetch })
	};
};
