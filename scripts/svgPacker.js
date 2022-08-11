#!/usr/bin/env node

/*
 * Usage:
 * $ node scripts/svgPacker.js [name_of_resources_dir]
 *
 * Example: resources/flags/*.svg -> src/svg/flags.svg
 * $ node scripts/svgPacker.js flags
 */

const fs = require('fs')
	, path = require('path')
	, SvgSpriter = require('svg-sprite');

const spriter = new SvgSpriter({
	mode: {
		defs: true,
	},
	shape: {
		transform: ['svgo'],
		id: {
			generator: (_, file) => file.basename.split('.')[0],
		},
	},
});

const targetDir = 'resources/' + process.argv[2]
	, outputDir = 'src/svg'
	, outputName = process.argv[2] + '_ui.svg';

if (!targetDir)
	throw new Error('Path to svg folder required');

if (!outputDir)
	throw new Error('Output path required');

if (!fs.existsSync(targetDir))
	throw new Error(`Unable to find ${targetDir}`);

if (!fs.existsSync(outputDir))
	fs.mkdirSync(outputDir, { recursive: true });

try { fs.rmSync(path.join(outputDir, outputName)); } catch {}

const files = fs.readdirSync(targetDir);
for (let file of files) {
	if (path.extname(file) !== '.svg') continue;

	const p = path.join(targetDir, file);
	const svg = fs.readFileSync(p, 'utf-8')
		.toString()
		.replace(/<g id="overlay"(.*?)<\/g>/gms, '')
		.replace(/ fill-rule="nonzero"/gms, '');

	spriter.add(p, null, svg);
}

spriter.compile((error, result) => {
	if (error) throw new Error(error);

	fs.writeFileSync(
		path.join(outputDir, outputName),
		result.defs.sprite.contents
	);
});
