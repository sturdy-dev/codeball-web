/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CODEBALL_API_HOST: string;
	readonly VITE_GITHUB_APP_NAME: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module '*?preset=logo' {
	const src: import('vite-plugin-image-presets').ImageAttrs[];
	export default src;
}

declare namespace App {
	interface Stuff {
		title: string;
		login?: string;
	}
}
