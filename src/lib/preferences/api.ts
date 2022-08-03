import { get as apiGET, post } from '$lib/api';
import type { Preference, SafetyLevel } from './types';

export const get = (
	{
		organization,
		repository
	}: {
		organization: string;
		repository: string;
	},
	opts: {
		fetch?: typeof fetch;
	} = {}
): Promise<Preference> =>
	apiGET(`/preferences/${organization}/${repository}`, new URLSearchParams({}), opts);

export const set = ({
	organization,
	repository,
	safety
}: {
	organization: string;
	repository: string;
	safety: SafetyLevel;
}): Promise<Preference> => post(`/preferences/${organization}/${repository}`, { safety });
