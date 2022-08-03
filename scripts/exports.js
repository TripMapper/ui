const glob = require('glob')
	, fs = require('fs')
	, package = require('../package.json')
	, path = require('path');

glob('src/[A-Z]*/*\.ts?(x)', (err, files) => {
	if (err) throw err;

	const exports = {
		'./globals.scss': './dist/globals.scss',
		'./variables.scss': './dist/variables.scss',
		'./util': './dist/util/index.js',
	};

	files.forEach(file => {
		const [, name] = file.split('/')
			, ext = path.extname(file) === '.ts' ? 'js' : 'jsx';

		exports[`./${name}`] = `./dist/${name}/index.${ext}`;
	});

	package.exports = exports;
	fs.writeFileSync(path.resolve(__dirname, '../package.json'), JSON.stringify(package, null, 2));
});
