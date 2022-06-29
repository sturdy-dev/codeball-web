import { get as apiGET } from '$lib/api';
import type { Subscription, UpcomingInvoice } from './types';
import { fromJSON, upcomingInvoiceFromJSON } from './utils';

export const list = (params: {} = {}): Promise<{ subscriptions: Subscription[]; next?: string }> =>
	apiGET(`/subscriptions`, new URLSearchParams(params)).then(({ subscriptions, next }) => ({
		subscriptions: subscriptions.map(fromJSON),
		next
	}));

export const upcoming = (id: string): Promise<UpcomingInvoice> =>
	apiGET(`/subscriptions/${id}/upcoming`).then(upcomingInvoiceFromJSON);
