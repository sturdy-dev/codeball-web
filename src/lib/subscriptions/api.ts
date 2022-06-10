import { get as apiGET } from '$lib/api';
import type { Subscription } from './types';
import { fromJSON } from './utils';

export const list = (params: {} = {}): Promise<{ subscriptions: Subscription[]; next?: string }> =>
	apiGET(`/subscriptions`, new URLSearchParams(params)).then(({ subscriptions, next }) => ({
		subscriptions: subscriptions.map(fromJSON),
		next
	}));
