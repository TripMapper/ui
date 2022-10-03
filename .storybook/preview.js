import '../src/globals.scss';
import '@storybook/addon-console';
import { setConfig } from 'next/config';

export const parameters = {
	viewMode: 'docs',
	controls: {
		expanded: true,
		hideNoControlsWarning: true,
	},
	docs: {
		inlineStories: true,
	},
	previewTabs: {
		'storybook/docs/panel': {
			index: -1
		},
		// canvas: { hidden: true },
	},
};

setConfig({
	experimental: { images: { allowFutureImage: true } },
	serverRuntimeConfig: {
		experimental: { images: { allowFutureImage: true } },
	},
	publicRuntimeConfig: {
		experimental: { images: { allowFutureImage: true } },
	},
});

// Next Image
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
	configurable: true,
	value: (props) => <OriginalNextImage {...props} unoptimized />,
});


// Next Future Image
import * as NextFutureImage from "next/future/image";

const OriginalNextFutureImage = NextFutureImage.default;

Object.defineProperty(NextFutureImage, "default", {
	configurable: true,
	value: (props) => <OriginalNextFutureImage {...props} unoptimized />,
});
