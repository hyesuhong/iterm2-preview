import { ITheme } from '@xterm/xterm';

export interface Scheme {
	name: string;
	colorScheme: ITheme;
	theme: 'light' | 'dark';
}
