export type SafetyLevel = 0 | 1 | 2;

export type Preference = {
	organization: string;
	repository: string;
	safety: SafetyLevel;
};
