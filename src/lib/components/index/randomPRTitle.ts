export const generate = () => `${random(prefixes)}: ${random(verbs)} ${random(nouns)}`;

const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const verbs = ['added', 'created', 'updated', 'fixed', 'removed', 'refactored'];

const prefixes = [
	'bug',
	'feature',
	'issue',
	'task',
	'chore',
	'docs',
	'style',
	'refactor',
	'perf',
	'test',
	'build',
	'ci'
];

const nouns = [
	'new feature',
	'some bugs',
	'authorization',
	'deployment script',
	'new release',
	'some css',
	'tests',
	'database migrations'
];
