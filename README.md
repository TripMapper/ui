# TripMapper UI

### IMPORTANT
When adding svg inline support, ensure you exclude UI SVG's suffixed with `_ui`.  
`test: /(?<!_ui)\.svg$/,`

### Audio
Add the following to your webpack config:
```js
config.module.rules.push({
    test: /\.(mp3)$/,
    type: 'asset/resource',
    generator: {
	    filename: 'static/chunks/[path][name].[hash][ext]',
    },
});
```

### Local
Remember to `pnpm link ../ui`
