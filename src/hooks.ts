import type { Handle } from '@sveltejs/kit';
import { BASE_URL } from '$lib/api';

const API_HOST = import.meta.env.VITE_CODEBALL_API_HOST;

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.url.pathname.startsWith(BASE_URL)) return await resolve(event);

	// this will proxy every request to the api
	// this is done to proxy cookies

	const url = new URL(API_HOST);
	url.pathname = event.url.pathname.slice(BASE_URL.length);
	url.search = event.url.search;

	return await fetch(url.toString(), {
		method: event.request.method,
		headers: event.request.headers,
		redirect: 'manual'
	});
};
