import { diff_match_patch } from 'diff-match-patch';

const dmp = new diff_match_patch();

export const lineMode = (text1: string, text2: string) => {
	const { chars1: lineText1, chars2: lineText2, lineArray } = dmp.diff_linesToChars_(text1, text2);
	var diffs = dmp.diff_main(lineText1, lineText2, false);
	dmp.diff_charsToLines_(diffs, lineArray);
	return diffs;
};
