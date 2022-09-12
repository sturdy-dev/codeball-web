import type { PageLoad } from '@sveltejs/kit';

throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export const load: PageLoad = async ({ stuff }) => ({ login: stuff.login });
