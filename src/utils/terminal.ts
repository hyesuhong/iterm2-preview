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
		project: '',
	},
	sources: {
		iTerm2_Color_Schemes: 'https://github.com/mbadolato/iTerm2-Color-Schemes',
		jetBranins_mono: 'https://www.jetbrains.com/lp/mono/',
		pretendard: 'https://github.com/orioncactus/pretendard',
		heroicons: 'https://heroicons.com',
	},
};

const commands = {
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
				? 'Successfully openend github'
				: 'Failed to open github ';
		},
	},
};

export const runCommand = (command: string) => {
	if (command.length > 0 && command in commands) {
		const commandKey = command as keyof typeof commands;
		const result = commands[commandKey].func();

		return result;
	}

	return `command not found: ${command}`;
};
