import type { Subscription } from './types';

export const fromJSON = (json: any): Subscription => ({
	...json,
	created_at: new Date(json.created_at),
    deleted_at: json.deleted_at ? new Date(json.deleted_at) : null,
});
