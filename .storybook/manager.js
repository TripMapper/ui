import { create } from '@storybook/theming';
import { addons } from '@storybook/addons';
import logo from './logo.svg';

export const theme = create({
	base: 'light',
	brandTitle: 'TripMapper UI',
	brandImage: logo,

	colorPrimary: '#A28366',
	colorSecondary: '#A28366',

	appBg: '#F4F2EF',
});

addons.setConfig({
	theme,
});
