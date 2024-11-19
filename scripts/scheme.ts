import { ITheme } from '@xterm/xterm';

export interface Scheme {
	theme: 'light' | 'dark';
	colorScheme: ITheme;
}

export const COLOR_NAME = {
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
} as const;

export type ColorNameKey = keyof typeof COLOR_NAME;
export type ColorNameValue = (typeof COLOR_NAME)[ColorNameKey];

export const getColorName = (key: ColorNameKey) => {
	return COLOR_NAME[key];
};

export type Rgb = {
	red?: number;
	green?: number;
	blue?: number;
};
