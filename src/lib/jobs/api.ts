import { get as apiGET, post } from '$lib/api';
import type { Job, JobsList } from './types';

export const get = (id: string): Promise<Job> => apiGET(`/jobs/${id}`);

export const create = ({ url }: { url: string }): Promise<Job> => post('/jobs', { url });

export const list = (): Promise<JobsList> => apiGET(`/jobs`);

export const listInOrganizationAndRepository = (
	organization: string,
	repository: string
): Promise<JobsList> =>
	apiGET(
		`/jobs?${new URLSearchParams({
			organization,
			repository
		})}`
	);
