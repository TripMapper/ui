module.exports = {
	stories: [
		'../src/**/*.stories.(ts|md)x',
	],
	addons: [
		'@storybook/addon-controls',
		'@storybook/addon-docs',
		'@storybook/preset-scss',
		'@storybook/addon-essentials',
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
					localIdentName: "[path][name]__[local]--[hash:base64:5]",
				};
			}

			return item;
		});

		config.module.rules.push({
			test: /\.(mp3)$/,
			type: 'asset/resource',
			generator: {
				filename: '[name].[hash][ext]',
			},
		});

		return config;
	},
};
