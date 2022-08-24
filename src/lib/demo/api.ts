import { post } from '$lib/api';

export type Suggestion = {
	commit_id: string;
	filename: string;
	from_line: number;
	to_line: number;
	text: string;
};

export const run = (req: { input: string; comment: string; line: number }): Promise<Suggestion[]> =>
	post('/demo/run', req);
