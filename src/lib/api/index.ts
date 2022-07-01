export const BASE_URL = import.meta.env.VITE_CODEBALL_API_HOST;

export class Unauthorized extends Error {
	constructor(message?: string) {
		super(message ?? 'Unauthorized');
		this.name = 'Unauthorized';
	}
}

export class BadRequestError extends Error {
	constructor(message?: string) {
		super(message ?? 'Bad request');
		this.name = 'BadRequestError';
	}
}

export class NotFoundError extends Error {
	constructor(message?: string) {
		super(message ?? 'Not found');
		this.name = 'NotFoundError';
	}
}

const handleResponse = async (response: Response) => {
	if (response.ok) {
		return await response.json();
	} else if (response.status === 401) {
		throw new Unauthorized(await response.text());
	} else if (response.status === 404) {
		throw new NotFoundError(await response.text());
	} else if (response.status === 400) {
		throw new BadRequestError(await response.text());
	} else {
		throw new Error(await response.text());
	}
};

const isBrowser = typeof window !== 'undefined';

export const get = async (
	url: string,
	params = new URLSearchParams(),
	opts: { fetch?: typeof fetch } = {}
) => {
	return (opts.fetch ?? fetch)(`${BASE_URL}${url}?${params.toString()}`, {
		// for server-side rendering, use same origin policy
		mode: isBrowser ? 'cors' : 'same-origin',
		credentials: 'include',
		redirect: 'follow'
	}).then(handleResponse);
};

export const post = async (url: string, body: any) =>
	fetch(`${BASE_URL}${url}`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		redirect: 'follow',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(handleResponse);
