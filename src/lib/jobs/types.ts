export type Status = 'registered' | 'running' | 'failure' | 'success' | 'unknown';

type job = {
	id: string;
	parent?: string;
	created_at: string;
	started_at: string;
	completed_at: any;
	status: Status;
	error?: Error;
	events?: Event[];
	meta: Meta;
};

export type Job = job & {
	repository?: Repository;
	contribution?: Contribution;
};

export type ContributionJob = job & {
	contribution: Contribution;
};

export type RepositoryJob = job & {
	repository: Repository;
};

export type Repository = {
	url: string;
	name: string;
	is_public: boolean;
	default_branch_name?: string;
	contribution_jobs: ContributionJob[];
};

export type Error = {
	message: string;
};

export type Contribution = {
	url: string;
	number: number;
	title: string;
	created_at: string;
	is_public: boolean;
	organization: string;
	repository: string;

	files?: ContributionFile[];

	predicted_outcome?: PredictedOutcome;
	actual_outcome?: ActualOutcome;

	merged_without_objections: boolean; // Deprecated
	merged_at: any; // Deprecated
	result: 'inconclusive' | 'approved' | 'not_approved' | null; // Deprecated
};

export type PredictedOutcome = {
	prediction: 'inconclusive' | 'approved' | 'not_approved';
	predicted_at: string;
	model_name: string;
	file_probabilities?: number[];
};

export type ActualOutcome = {
	merged_without_objections: boolean;
	closed_at?: string;
	merged_at?: string;
};

export type Event = {
	type: string;
	created_at: string;
	github_action?: GitHubActionEvent;
};

export type GitHubActionEvent = {
	name: string;
	error?: string;
};

export type Meta = {
	user_agent: string;
};

export type ContributionFile = {
	name: string;
};
