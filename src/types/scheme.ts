import { ITheme } from '@xterm/xterm';

export type Theme = '' | 'light' | 'dark';

export interface Scheme {
	name: string;
	colorScheme: ITheme;
	theme: Exclude<Theme, ''>;
}
