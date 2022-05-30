import { get as apiGET, post } from '$lib/api';
import type { Job } from './types';

export const get = (id: string): Promise<Job> => apiGET(`/jobs/${id}`);

export const create = ({ url }: { url: string }): Promise<Job> => post('/jobs', { url });
