export interface Repository {
	name: string;
}

export interface Organization {
	name: string;
	repositories: Repository[];
}

export interface OrganizationsList {
	organizations: Organization[];
}
