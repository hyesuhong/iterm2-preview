import { keyframes, style } from '@vanilla-extract/css';

export const schemeGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridAutoRows: 'max-content',
	gap: 24,
	overflowX: 'hidden',
	overflowY: 'auto',
});

export const schemeCard = style({
	padding: 8,
	borderRadius: 8,
	border: '1px solid #eee',
});

export const schemeDisplay = style({
	background: '#333D4C',
	padding: '20px 12px',
	borderRadius: 4,
});

export const colorChart = style({
	display: 'grid',
	gridTemplate: 'repeat(2, 1fr) / repeat(8, 1fr)',
	width: '90%',
	maxWidth: 300,
	aspectRatio: '4',
	marginBottom: 20,
});

export const schemeText = style({
	color: '#A6B2C0',
	fontFamily: 'monospace',
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
	background: '#DDB3FF',
	verticalAlign: 'middle',
	animation: `${ping} 0.7s infinite linear alternate`,
});

export const schemeName = style({
	fontSize: 14,
	marginTop: 12,
});
