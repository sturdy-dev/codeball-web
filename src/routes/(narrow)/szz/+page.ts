import type {PageLoad} from './$types';

export const load: PageLoad = async ({parent, fetch}) => {
    const parentData = await parent();

    const bics = await fetch(`bic/bic_r_1663665605.json`);
    const commits = await fetch(`bic/posthog_3_commits.json`);

    return {
        ...parentData,

        bics: bics.json(),
        commits: commits.json(),

        meta: {
            ...parentData.meta,
            title: 'Codeball Suggester'
        }
    };
};
