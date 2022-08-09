module.exports = {
	stories: [
		'../src/**/*.stories.(ts|md)x',
	],
	addons: [
		'@storybook/addon-controls',
		'@storybook/addon-docs',
		'@storybook/preset-scss',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
		disableTelemetry: true,
	},
	babel: async (options) => {
		options.plugins.push(['babel-plugin-inline-react-svg', {
			svgo: {
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
		}]);
		return options;
	},
	webpackFinal: async config => {
		// CSS Modules
		const ruleCssIndex = config.module.rules.findIndex(
			rule => rule.test.toString() === '/\\.s[ca]ss$/'
		);

		config.module.rules[ruleCssIndex].use.map((item) => {
			if (item.loader && item.loader.includes("/css-loader/")) {
				if (!item.options)
					item.options = {};

				item.options.modules = {
					mode: 'pure',
					auto: filename => filename.endsWith('.module.scss'),
				};
			}

			return item;
		});

		return config;
	},
};
