import { isContributionJob, stream, toContributionJob, type Stream } from '$lib/jobs';
import { generate as randomName } from './randomName';
import { generate as randomTitle } from './randomPRTitle';

export type PR = {
	id: number;
	running: Promise<Boolean>;
	author: string;
	title: string;
};

export const open = () => {
	const resolvers: Record<string, (value: boolean) => void> = {};
	const q = queue(delay(1500, 2000), limit(5));
	let s: Stream;
	stream().then((st) => {
		s = st;
		st.subscribe((job) => {
			if (!isContributionJob(job)) return;
			const { contribution } = toContributionJob(job);
			if (job.status === 'running') {
				const promise = new Promise<boolean>((resolve) => {
					resolvers[job.id] = resolve;
				});
				const pr: PR = {
					id: contribution.number,
					running: promise,
					author: contribution.author,
					title: contribution.title
				};
				q.push(pr);
			} else if (job.status === 'success') {
				resolvers[job.id]?.(contribution.result === 'approved');
				delete resolvers[job.id];
			} else if (job.status === 'failure') {
				resolvers[job.id]?.(false);
				delete resolvers[job.id];
			}
		});
	});
	return {
		next: q.pop,
		close: () => {
			if (s) s.close();
		}
	};
};

type Queue = {
	push: (job: PR) => void;
	pop: () => Promise<PR>;
	length: () => number;
};

type Decorator = (q: Queue) => Queue;

const queue = (...decorators: Decorator[]): Queue => {
	const q: PR[] = [];
	return decorators.reduce((q: Queue, m: Decorator) => m(q), {
		push: (job: PR) => q.push(job),
		pop: (): Promise<PR> =>
			new Promise((resolve) =>
				resolve(q.shift() ?? fakePR({ delay: 700 + Math.floor(Math.random() * 1000) }))
			),
		length: () => q.length
	});
};

const limit =
	(limit: number) =>
	(q: Queue): Queue => ({
		push: (job: PR) => {
			q.push(job);
			if (q.length() > limit) q.pop();
		},
		pop: q.pop,
		length: q.length
	});

const delay =
	(delay: number, jitter: number) =>
	(q: Queue): Queue => ({
		push: q.push,
		pop: () =>
			new Promise((resolve) => {
				setTimeout(() => resolve(q.pop()), delay + Math.floor(Math.random() * jitter));
			}),
		length: q.length
	});

export const fakePR = (params?: { delay: number }): PR => ({
	id: 1 + Math.floor(Math.random() * 98),
	running: new Promise((resolve) =>
		setTimeout(() => resolve(Math.random() > 0.33), params?.delay ?? 0)
	),
	author: randomName(),
	title: randomTitle()
});
