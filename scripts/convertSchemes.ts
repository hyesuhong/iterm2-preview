import { ITheme } from '@xterm/xterm';
import fs from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

/* TODO
- [x] get all schemes
- [x] parse schemes(xml -> object)
- [x] convert rgb -> hex
- [ ] detect dark or light by backgroun color
- [ ] write json file inclues all schemes
*/

const TARGET_DIR = join(cwd(), 'iTerm2-Color-Schemes', 'schemes');
const EXTENSION = 'itermcolors';

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

const COLOR_NAME = {
	'Ansi 1': 'red',
	'Ansi 0': 'black',
	'Ansi 2': 'green',
	'Ansi 3': 'yellow',
	'Ansi 4': 'blue',
	'Ansi 5': 'magenta',
	'Ansi 6': 'cyan',
	'Ansi 7': 'white',
	'Ansi 8': 'brightBlack',
	'Ansi 9': 'brightRed',
	'Ansi 10': 'brightGreen',
	'Ansi 11': 'brightYellow',
	'Ansi 12': 'brightBlue',
	'Ansi 13': 'brightMagenta',
	'Ansi 14': 'brightCyan',
	'Ansi 15': 'brightWhite',
	Background: 'background',
	Cursor: 'cursor',
	Foreground: 'foreground',
	'Selected Text': 'selectionForeground',
	Selection: 'selectionBackground',
};

export const getAllSchemeFiles = async () => {
	const dirArr = await fs.readdir(TARGET_DIR);
	const nameList = dirArr.map((filename) =>
		filename.replace(/\.itermcolors/gi, '')
	);

	const data = await Promise.all(nameList.map((name) => getSchemeByName(name)));

	return data.length;
};

export const getSchemeByName = async (name: string) => {
	const basePath = join(TARGET_DIR, `${name}.${EXTENSION}`);

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

	return { name, colorScheme: scheme };
};

const parseSchemeLises = (lines: string[]): ITheme => {
	const schemeMap = new Map();

	const keyLines = lines
		.map((line, index) => ({ index, text: line }))
		.filter((line) => line.text.match(REGEXP.key.all));

	for (let { text, index } of keyLines) {
		const key = modifyKey(text.replace(REGEXP.replacer.key, ''));
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

	schemeMap.delete('');

	const schemeColorObject = Object.fromEntries(schemeMap);

	const schemeHexColor = Object.keys(schemeColorObject)
		.map((colors) => {
			const hex = convertRGBToHex(schemeColorObject[colors]);
			return { color: colors, hex };
		})
		.reduce<Record<string, string>>((acc, colors) => {
			acc[colors.color] = colors.hex;
			return acc;
		}, {});

	return schemeHexColor;
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
				const colorName = name as keyof typeof COLOR_NAME;
				const color = COLOR_NAME[colorName];

				return color;
			}
		}
	}

	return '';
};

const convertRGBToHex = ({
	red = 0,
	green = 0,
	blue = 0,
}: {
	red?: number;
	green?: number;
	blue?: number;
}) => {
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
