import type { Status, Job, ContributionJob, RepositoryJob } from './types';

export const isFinalStatus = (status: Status) => status === 'failure' || status === 'success';

export const isRepositoryJob = (job: Job) => job.repository !== undefined;

export const isContributionJob = (job: Job) => job.contribution !== undefined;

export const toContributionJob = (job: Job): ContributionJob => {
	if (!isContributionJob(job)) {
		throw new Error('Job is not a contribution job');
	}
	return { ...job, contribution: job.contribution! };
};

export const toRepositoryJob = (job: Job): RepositoryJob => {
	if (!isRepositoryJob(job)) {
		throw new Error('Job is not a repository job');
	}
	return { ...job, repository: job.repository! };
};
