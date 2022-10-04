declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.svg" {
	const content: any;
	export default content;
}

declare module "*.jpg";
declare module "*.webp";

declare module '*.mp3' {
	const src: string;
	export default src;
}
