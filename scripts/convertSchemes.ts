import fs from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';
import { COLOR_NAME, ColorNameKey, getColorName, Rgb, Scheme } from './scheme';

const TARGET_DIR = join(cwd(), 'iTerm2-Color-Schemes', 'schemes');
const EXPORT_DIR = join(cwd(), 'src', 'data');
const EXPORT_NAME = 'schemes.json';
const EXTENSION = '.itermcolors';

const REGEXP = {
	key: {
		all: /<key>[a-zA-Z\- 0-9]+<\/key>/,
		color: /<key>[a-zA-Z\- 0-9]+Color<\/key>/,
		component: /<key>[a-zA-Z ]+Component<\/key>/,
	},
	real: /<real>[\d.]+<\/real>/,
	dictStart: /<dict>/,
	dictEnd: /<\/dict>/,
	replacer: {
		key: /<\/*key>/g,
		real: /<\/*real>/g,
	},
};

const writeSchemesJson = async () => {
	const data = await getAllSchemeFiles();
	try {
		await fs.access(EXPORT_DIR);
		console.log('can access');
	} catch (e) {
		console.log('cannot access');
		await fs.mkdir(EXPORT_DIR);
	}

	const exportFileDir = join(EXPORT_DIR, EXPORT_NAME);
	await fs.writeFile(exportFileDir, JSON.stringify(data));
};

export const getAllSchemeFiles = async () => {
	const dirArr = await fs.readdir(TARGET_DIR);
	const nameList = dirArr.map((filename) =>
		filename.replace(/\.itermcolors/gi, '')
	);

	const data = await Promise.all(nameList.map((name) => getSchemeByName(name)));

	return data;
};

export const getSchemeByName = async (name: string) => {
	const basePath = join(TARGET_DIR, `${name}${EXTENSION}`);

	const contents = await fs.readFile(basePath, 'utf8');
	const contentLines = contents.split(/\n/);

	const plistStartLine = contentLines.findIndex((line) =>
		line.startsWith('<plist')
	);
	const plistEndLine = contentLines.findIndex((line) =>
		line.startsWith('</plist>')
	);

	const onlyDictionary = contentLines.slice(
		plistStartLine + 2,
		plistEndLine - 1
	);
	const scheme = parseSchemeLises(onlyDictionary);

	return { name, ...scheme };
};

const parseSchemeLises = (lines: string[]): Scheme => {
	const schemeMap = new Map<string, Rgb>();

	const keyLines = lines
		.map((line, index) => ({ index, text: line }))
		.filter((line) => line.text.match(REGEXP.key.all));

	for (let { text, index } of keyLines) {
		const key = modifyKey(text.replace(REGEXP.replacer.key, ''));

		if (key === '') {
			continue;
		}

		const nextLineType = lines[index + 1].match(REGEXP.dictStart)
			? 'DICT'
			: lines[index + 1].match(REGEXP.real)
				? 'REAL'
				: null;

		switch (nextLineType) {
			case 'DICT':
				{
					schemeMap.set(key, {});
				}
				break;
			case 'REAL':
				{
					const nearbyColor = lines
						.slice(0, index)
						.findLast((l) => l.match(REGEXP.key.color));

					if (nearbyColor) {
						const nearbyKey = modifyKey(
							nearbyColor.replace(REGEXP.replacer.key, '')
						);
						const nearbyColorKey = schemeMap.get(nearbyKey);
						const colorValue = lines[index + 1].replace(
							REGEXP.replacer.real,
							''
						);

						schemeMap.set(nearbyKey, {
							...nearbyColorKey,
							[key]: Number(colorValue),
						});
					}
				}
				break;
			default:
				continue;
		}
	}

	const schemeColorObject = Object.fromEntries(schemeMap);

	const isDark = detectIsDark(schemeColorObject.background);

	const schemeHexColor = Object.keys(schemeColorObject)
		.map((colors) => {
			const hex = convertRGBToHex(schemeColorObject[colors]);
			return { color: colors, hex };
		})
		.reduce<Record<string, string>>((acc, colors) => {
			acc[colors.color] = colors.hex;
			return acc;
		}, {});

	return { colorScheme: schemeHexColor, theme: isDark };
};

const modifyKey = (key: string) => {
	const trimKey = key.trim();

	if (!(trimKey.includes('Color') || trimKey.includes('Component'))) {
		return '';
	} else {
		if (trimKey.includes('Component')) {
			return trimKey.replace(' Component', '').toLowerCase();
		}

		if (trimKey.includes('Color')) {
			const name = trimKey.replace(' Color', '');
			if (name in COLOR_NAME) {
				const colorName = name as ColorNameKey;
				const color = getColorName(colorName);

				return color;
			}
		}
	}

	return '';
};

const convertRGBToHex = ({ red = 0, green = 0, blue = 0 }: Rgb) => {
	const r = getHexCode(red);
	const g = getHexCode(green);
	const b = getHexCode(blue);

	return `#${r}${g}${b}`;
};

const getHexCode = (color: number) => {
	const colorValue = Math.round(color * 255);
	const code = colorValue.toString(16);
	const hexCode = code.length < 2 ? `0${code}` : code;
	return hexCode;
};

const detectIsDark = ({ red = 0, green = 0, blue = 0 }: Rgb) => {
	const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
	const isDark = luminance < 0.4;
	return isDark ? 'dark' : 'light';
};

writeSchemesJson();
