export const BASE_URL = '/api';

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

export const get = async (url: string, params = new URLSearchParams()) =>
	fetch(`${BASE_URL}${url}?${params.toString()}`, {
		mode: 'cors',
		credentials: 'include',
		redirect: 'follow'
	}).then(handleResponse);

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
