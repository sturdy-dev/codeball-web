import { get as apiGET, post } from '$lib/api';
import type { Job } from './types';

export const get = (id: string): Promise<Job> => apiGET(`/jobs/${id}`);

export const create = ({ url }: { url: string }): Promise<Job> => post('/jobs', { url });

export const list = (
	params: {
		organization?: string;
		repository?: string;
		cursor?: string;
		onlyRootJobs?: boolean;
	} = {}
): Promise<{ jobs: Job[]; next?: string }> => apiGET(`/jobs`, new URLSearchParams(params));
