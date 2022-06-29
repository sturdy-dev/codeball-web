export type Subscription = {
	id: string;
	github_organization: string;
	created_at: Date;
	deleted_at?: Date;
	customer: Customer;
};

export type Customer = {
	id: string;
	github_login: string;
	created_at: Date;
	deleted_at?: Date;
};

export type UpcomingInvoice = {
	preliminary_amount: number;
	currency: string;
	period_start: Date;
	period_end: Date;
	usage: number;
};
