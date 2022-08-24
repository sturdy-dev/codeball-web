export type Author = {
	name: string;
	avatarUrl?: string;
};

export type Diff = {
	line: string;
	type: 'plus' | 'minus';
}[];

export type Comment = {
	line: number;
	isOutdated: boolean;
	text: string | Diff;
	author: Author;
	replies: Comment[];
};

export type Line = {
	text: string;
};

export type File = {
	comments: Comment[];
	lines: Line[];
};

export const fileFromString = (text: string, previous?: File): File => {
	const lines = text.split('\n').map((line) => ({ text: line }));
	const comments =
		previous?.comments
			// remove comments on deleted lines
			.filter((c) => c.line <= lines.length)
			// if comment turns out to be on a different line, mark it as outdated
			.map((comment) => ({
				...comment,
				isOutdated: previous.lines[comment.line]?.text !== lines[comment.line]?.text
			})) ?? [];
	return {
		lines,
		comments
	};
};

export const fileToString = (file: File): string => file.lines.map((l) => l.text).join('\n');
