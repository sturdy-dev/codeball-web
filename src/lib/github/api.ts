import { get as apiGET } from '$lib/api';

export type Token = {
	login: string;
};

export const get = (): Promise<Token> => apiGET('/github');
