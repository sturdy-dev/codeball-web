import { get as apiGET } from '$lib/api';
import type { Subscription, UpcomingInvoice } from './types';
import { fromJSON, upcomingInvoiceFromJSON } from './utils';

export const list = (
	params: {} = {},
	opts: { fetch?: typeof fetch } = {}
): Promise<{ subscriptions: Subscription[]; next?: string }> =>
	apiGET(`/subscriptions`, new URLSearchParams(params), opts).then(({ subscriptions, next }) => ({
		subscriptions: subscriptions.map(fromJSON),
		next
	}));

export const upcoming = (
	id: string,
	opts: { fetch?: typeof fetch } = {}
): Promise<UpcomingInvoice> =>
	apiGET(`/subscriptions/${id}/upcoming`, new URLSearchParams(), opts).then(
		upcomingInvoiceFromJSON
	);
