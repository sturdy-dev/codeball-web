import { get as apiGET } from '$lib/api';
import type { OrganizationsList } from './types';

export type Token = {
	login: string;
};

export const get = (opts: { fetch?: typeof fetch } = {}): Promise<Token> =>
	apiGET('/github', undefined, opts);
     

export const listOrganizations = (
	opts: { fetch?: typeof fetch } = {}
): Promise<OrganizationsList> => apiGET('/github/organizations', new URLSearchParams(), opts);
