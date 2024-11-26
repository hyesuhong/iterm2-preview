import { style } from '@vanilla-extract/css';

export const header = style({
	display: 'flex',
	alignItems: 'center',
	columnGap: 4,
	padding: 24,
	fontSize: 14,
});

export const headerIcon = style({
	width: 24,
	height: 24,
});
