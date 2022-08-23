import { get as apiGET, post } from '$lib/api';
import type { Job } from './types';

export const get = (id: string, opts: { fetch?: typeof fetch } = {}): Promise<Job> =>
	apiGET(`/jobs/${id}`, undefined, opts);

export const create = ({ url }: { url: string }): Promise<Job> => post('/jobs', { url });

export type ListOptions = {
	organization?: string;
	repository?: string;
	cursor?: string;
	onlyRootJobs?: boolean;
};

export const list = (params: ListOptions = {}): Promise<{ jobs: Job[]; next?: string }> =>
	apiGET(
		`/jobs`,
		new URLSearchParams(
			Object.fromEntries(Object.entries(params).map(([key, value]) => [key, value.toString()]))
		)
	);
