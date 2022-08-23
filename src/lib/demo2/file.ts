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
	text: Promise<string | Diff>;
	author: Author;
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
		previous?.comments.map((comment) => {
			return {
				...comment,
				isOutdated: previous.lines[comment.line]?.text !== lines[comment.line]?.text
			};
		}) ?? [];
	return {
		lines,
		comments
	};
};
