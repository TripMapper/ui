#!/usr/bin/env node

/*
 * Usage:
 * $ node scripts/svgPacker.js [name_of_resources_dir]
 *
 * Example: resources/flags/*.svg -> src/svg/flags_ui.svg
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

const typesFile = 'src/Types.d.ts';

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

const types = [];

const files = fs.readdirSync(targetDir);
for (let file of files) {
	if (path.extname(file) !== '.svg') continue;

	const p = path.join(targetDir, file);
	const svg = fs.readFileSync(p, 'utf-8')
		.toString()
		.replace(/<g id="overlay"(.*?)<\/g>/gms, '')
		.replace(/ fill-rule="nonzero"/gms, '');

	types.push(path.basename(file, path.extname(file)));

	spriter.add(p, null, svg);
}

function capitalize (str, forceLower = false) {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + (forceLower ? str.slice(1).toLowerCase() : str.slice(1));
}

spriter.compile((error, result) => {
	if (error) throw new Error(error);

	// Output compiled SVG
	fs.writeFileSync(
		path.join(outputDir, outputName),
		result.defs.sprite.contents
	);

	// Update types
	let globalsText = fs.readFileSync(typesFile).toString();
	const typeName = `export type ${capitalize(process.argv[2])}`;
	const exportType = `${typeName} = '${types.join("' | '")}';`;

	if (globalsText.indexOf(typeName) === -1) {
		globalsText += '\n' + exportType + '\n';
	} else {
		const rx = new RegExp(`^${typeName}(.*)$`, 'mg');
		globalsText = globalsText.replace(rx, exportType);
	}

	fs.writeFileSync(typesFile, globalsText);

	// Update icon docs
	if (process.argv[2] === 'icons') {
		const singular = capitalize(process.argv[2].replace(/s$/, ''));
		const storyPath = `src/${singular}/${singular}.stories.mdx`;
		const storyText = fs.readFileSync(storyPath).toString();
		fs.writeFileSync(storyPath, storyText.replace(
			/<IconGallery>.*<\/IconGallery>/s,
			`<IconGallery>\n${types.map(type => `	<IconItem name="${type}"><Icon of="${type}" xl /></IconItem>`).join('\n')}\n</IconGallery>`
		));
	}
});
