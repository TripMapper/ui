import '../src/globals.scss';
import '@storybook/addon-console';

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

import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
	configurable: true,
	value: (props) => <OriginalNextImage {...props} unoptimized />,
});
