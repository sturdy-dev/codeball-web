import {list} from "../../../lib/subscriptions";
import type {PageLoad} from "@sveltejs/kit";
import {listOrganizations} from "../../../lib/github";

export const prerender = false;

// TODO: Figure out how to render on the server
export const ssr = false;

export const load: PageLoad = async ({parent, fetch}) => {
    const parentData = await parent();

    return Promise.all([
        list({}, {fetch}),
        listOrganizations({fetch}),
    ]).then(
        ([{subscriptions}, {organizations}]) => ({
            ...parentData,

            meta: {
                ...parentData.meta,
                title: 'Subscriptions',
            },

            subscriptions,
            organizations
        })
    );
};
