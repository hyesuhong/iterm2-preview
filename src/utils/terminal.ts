export const initialDisplay = [
	'┌ Features ───────────────────────────────────┐',
	'│                                             │',
	'│ - \x1B[32mSearch\x1B[0m by name                            │',
	'│                                             │',
	'│ - \x1B[34mFilter\x1B[0m by appearance                      │',
	'│                                             │',
	'│ - \x1B[35mDownload\x1B[0m if you find a scheme you like    │',
	'│                                             │',
	'└─────────────────────────────────────────────┘',
	'',
	'This sample is a simulator.',
	'Try running `help`, then you can check available commands.',
	'$ ',
].join('\r\n');

const infoData = {
	description: `Preview for iTerm2's theme.`,
	github: {
		developer: 'https://github.com/hyesuhong',
		project: 'https://github.com/hyesuhong/iterm2-preview',
	},
	sources: {
		iTerm2_Color_Schemes: 'https://github.com/mbadolato/iTerm2-Color-Schemes',
		jetBranins_mono: 'https://www.jetbrains.com/lp/mono/',
		pretendard: 'https://github.com/orioncactus/pretendard',
		heroicons: 'https://heroicons.com',
	},
};

const ANSI_ESCAPE = '\x1b';
const ANSI_RESET = '0';
const ANSI_COLOR_CODE = {
	foreground: {
		black: '30',
		red: '31',
		green: '32',
		yellow: '33',
		blue: '34',
		magenta: '35',
		cyan: '36',
		white: '37',
		default: '39',
	},
	background: {
		black: '40',
		red: '41',
		green: '42',
		yellow: '43',
		blue: '44',
		magenta: '45',
		cyan: '46',
		white: '47',
		default: '49',
	},
};

export const commands = {
	help: {
		description: 'Prints this help message',
		func: () => {
			const firstLine = `These are available commands in this terminal. Let's Try!`;
			const commandsDescription: string[] = Object.entries(commands).map(
				([key, values]) => {
					const keyWithPadding = key.padEnd(6, ' ');
					return `  \x1B[32m${keyWithPadding}\x1b[0m        ${values.description}`;
				}
			);
			const result = [firstLine, '', ...commandsDescription, ''].join('\r\n');
			return result;
		},
	},
	info: {
		description: `Prints this project's information`,
		func: () => {
			const infoDescription = Object.entries(infoData).map(([key, value]) => {
				const boldKey = `\x1b[1m${key}\x1b[0m`;
				const valueLine =
					typeof value === 'string'
						? [`  ${value}`]
						: Object.entries(value).map(
								([subKey, subValue]) =>
									`  ${subKey.replace('_', ' ')}: ${subValue}`
							);
				return [boldKey, ...valueLine];
			});

			const result = infoDescription
				.map((base) => [...base, ''])
				.flat()
				.join('\r\n');

			return result;
		},
	},
	github: {
		description: `Open project's github in new tab`,
		func: () => {
			const isSuccessedOpenUrl = open(infoData.github.project, '_blank');
			return isSuccessedOpenUrl !== null
				? 'Successfully opened github'
				: 'Failed to open github ';
		},
	},
	color: {
		description: 'Preview colored text',
		func: () => {
			const foregroundColoredText = Object.keys(ANSI_COLOR_CODE.foreground).map(
				(key) => {
					const colorKey = key as keyof typeof ANSI_COLOR_CODE.foreground;
					return `${ANSI_ESCAPE}[${ANSI_COLOR_CODE.foreground[colorKey]}mforeground ${key}${ANSI_ESCAPE}[${ANSI_RESET}m`;
				}
			);
			const backgroundColoredText = Object.keys(ANSI_COLOR_CODE.background).map(
				(key) => {
					const colorKey = key as keyof typeof ANSI_COLOR_CODE.foreground;
					return `${ANSI_ESCAPE}[${ANSI_COLOR_CODE.background[colorKey]}mbackground ${key}${ANSI_ESCAPE}[${ANSI_RESET}m`;
				}
			);

			return [...foregroundColoredText, ...backgroundColoredText].join('\r\n');
		},
	},
};
