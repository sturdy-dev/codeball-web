import { listen } from '$lib/api';
import type { Job } from './types';

export type Stream = {
	subscribe: (callback: (job: Job) => void) => void;
	close: () => void;
};

export const stream = async (): Promise<Stream> => {
	const socket = await listen('/jobs/stream');
	return {
		subscribe: (callback: (job: Job) => void) => socket.onmessage((data) => callback(data)),
		close: socket.close
	};
};
