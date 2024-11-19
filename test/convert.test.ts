import { expect, test } from 'vitest';
import { getAllSchemeFiles, getSchemeByName } from '../scripts/convertSchemes';

test('read all scheme files', async () => {
	expect(await getAllSchemeFiles()).toBe(333);
});

test('get 3024 Day color schemes', async () => {
	const scheme3024Day = {
		colorScheme: {
			background: '#f7f7f7',
			black: '#090300',
			blue: '#01a0e4',
			brightBlack: '#5c5855',
			brightBlue: '#807d7c',
			brightCyan: '#cdab53',
			brightGreen: '#3a3432',
			brightMagenta: '#d6d5d4',
			brightRed: '#e8bbd0',
			brightWhite: '#f7f7f7',
			brightYellow: '#4a4543',
			cursor: '#4a4543',
			cyan: '#b5e4f4',
			foreground: '#4a4543',
			green: '#01a252',
			magenta: '#a16a94',
			red: '#db2d20',
			selectionBackground: '#a5a2a2',
			selectionForeground: '#4a4543',
			white: '#a5a2a2',
			yellow: '#fded02',
		},
		name: '3024 Day',
		theme: 'light',
	};

	expect(await getSchemeByName('3024 Day')).toStrictEqual(scheme3024Day);
});
