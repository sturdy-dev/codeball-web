import ReconnectingWebSocket from 'reconnecting-websocket';

const BASE_URL = import.meta.env.VITE_CODEBALL_API_HOST;

export type Stream = {
	onmessage: (callback: (data: any) => void) => void;
	close: () => void;
};

export const listen = (path: string): Promise<Stream> =>
	new Promise((resolve, reject) => {
		const url = new URL(path, `ws${BASE_URL.slice(4)}`).toString();
		const socket = new ReconnectingWebSocket(url, undefined, {
			WebSocket: WebSocket
		});
		socket.addEventListener('open', () => {
			resolve({
				onmessage: (callback) =>
					socket.addEventListener('message', (event) => callback(JSON.parse(event.data))),
				close: () => socket.close()
			});
		});
		socket.addEventListener('error', (event) => reject(event));
	});
