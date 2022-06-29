import type { Subscription, UpcomingInvoice } from './types';

export const fromJSON = (json: any): Subscription => ({
	...json,
	created_at: new Date(json.created_at),
	deleted_at: json.deleted_at ? new Date(json.deleted_at) : null
});

export const upcomingInvoiceFromJSON = (json: any): UpcomingInvoice => ({
	...json,
	period_start: new Date(json.period_start),
	period_end: new Date(json.period_end)
});
