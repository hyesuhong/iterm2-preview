import { style } from '@vanilla-extract/css';

export const form = style({
	display: 'flex',
	flex: '1',
	height: 32,
	columnGap: 4,
	border: '1px solid #eee',
	borderRadius: 4,

	selectors: {
		'&:focus-within': {
			borderColor: '#999',
		},
	},
});

export const input = style({
	flex: 1,
	appearance: 'none',
	border: 'none',
	outline: 'none',
	borderRadius: 0,
	fontSize: 12,
	padding: '0 4px',

	selectors: {
		'&::placeholder': {
			color: '#999999',
		},
	},
});

export const button = style({
	flex: '0 0 32px',
	border: 'none',
	background: 'transparent',
	borderRadius: 0,
	padding: 4,
});
