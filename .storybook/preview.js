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
