import {
	createThemeContract,
	createVar,
	keyframes,
	style,
	styleVariants,
} from '@vanilla-extract/css';
import { schemeListContainer } from './container.css';

export const schemeCssVars = createThemeContract({
	background: null,
	foreground: null,
	selection: {
		background: null,
		foreground: null,
	},
	ansi: {
		black: null,
		red: null,
		green: null,
		yellow: null,
		blue: null,
		magenta: null,
		cyan: null,
		white: null,
		brightBlack: null,
		brightRed: null,
		brightGreen: null,
		brightYellow: null,
		brightBlue: null,
		brightMagenta: null,
		brightCyan: null,
		brightWhite: null,
	},
	cursor: null,
});

export const backgroundVar = createVar();
export const textColorVar = createVar();
export const cursorColorVar = createVar();

export const schemeGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
	gridAutoRows: 'max-content',
	gap: 24,
	overflowX: 'hidden',
	overflowY: 'auto',

	'@container': {
		[`${schemeListContainer} (max-width: 400px)`]: {
			gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
		},
	},
});

const schemeCardBase = style({
	display: 'flex',
	flexDirection: 'column-reverse',
	rowGap: 12,
	padding: 8,
	borderRadius: 8,
	borderWidth: 1,
	borderStyle: 'solid',
});

export const schemeCard = styleVariants({
	default: [
		schemeCardBase,
		{
			borderColor: '#eee',
		},
	],
	selected: [
		schemeCardBase,
		{
			borderColor: '#5856D6',
		},
	],
});

export const schemeDisplay = style({
	flex: 1,
	background: schemeCssVars.background,
	padding: '20px 12px',
	borderRadius: 4,
	wordBreak: 'break-word',
	color: schemeCssVars.foreground,

	'::selection': {
		backgroundColor: schemeCssVars.selection.background,
		color: schemeCssVars.selection.foreground,
	},
});

export const colorChart = style({
	display: 'grid',
	gridTemplate: 'repeat(2, 1fr) / repeat(8, 1fr)',
	width: '90%',
	maxWidth: 300,
	aspectRatio: '4',
	marginBottom: 20,
});

export const colorChartItem = style({
	selectors: {
		'&.ansi_black': {
			background: schemeCssVars.ansi.black,
		},
		'&.ansi_red': {
			background: schemeCssVars.ansi.red,
		},
		'&.ansi_green': {
			background: schemeCssVars.ansi.green,
		},
		'&.ansi_yellow': {
			background: schemeCssVars.ansi.yellow,
		},
		'&.ansi_blue': {
			background: schemeCssVars.ansi.blue,
		},
		'&.ansi_magenta': {
			background: schemeCssVars.ansi.magenta,
		},
		'&.ansi_cyan': {
			background: schemeCssVars.ansi.cyan,
		},
		'&.ansi_white': {
			background: schemeCssVars.ansi.white,
		},
		'&.ansi_brightBlack': {
			background: schemeCssVars.ansi.brightBlack,
		},
		'&.ansi_brightRed': {
			background: schemeCssVars.ansi.brightRed,
		},
		'&.ansi_brightGreen': {
			background: schemeCssVars.ansi.brightGreen,
		},
		'&.ansi_brightYellow': {
			background: schemeCssVars.ansi.brightYellow,
		},
		'&.ansi_brightBlue': {
			background: schemeCssVars.ansi.brightBlue,
		},
		'&.ansi_brightMagenta': {
			background: schemeCssVars.ansi.brightMagenta,
		},
		'&.ansi_brightCyan': {
			background: schemeCssVars.ansi.brightCyan,
		},
		'&.ansi_brightWhite': {
			background: schemeCssVars.ansi.brightWhite,
		},
	},
});

export const schemeText = style({
	fontSize: 14,
});

const ping = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

export const schemeCursor = style({
	display: 'inline-block',
	marginLeft: '1em',
	width: 4,
	height: '1em',
	background: schemeCssVars.cursor,
	verticalAlign: 'middle',
	animation: `${ping} 0.7s infinite linear alternate`,
});

export const schemeName = style({
	display: 'flex',
	alignItems: 'center',
	columnGap: '0.25rem',
	fontSize: 14,
});

export const schemeNameSpan = style({
	flex: 1,
});
