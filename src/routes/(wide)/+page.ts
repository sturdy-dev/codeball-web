throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export const load = async ({ stuff }) => ({
	props: { login: stuff?.login ?? null },
	stuff: {
		title: 'Codeball – AI Powered Code Review',
		description:
			'Codeball finds bugs in your Pull Requests, lets you ship faster and with higher confidence.'
	}
});
