import { style, styleVariants } from '@vanilla-extract/css';

export const main = style({
	display: 'flex',
	gap: '0 24px',
	padding: '0 24px 40px',
});

const sectionBase = style({
	background: '#ffffff',
	borderRadius: 16,
	overflow: 'hidden',
});

export const section = styleVariants({
	big: [
		sectionBase,
		{
			flex: 3,
		},
	],
	small: [
		sectionBase,
		{
			flex: 1,
		},
	],
});
