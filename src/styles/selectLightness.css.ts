import { style } from '@vanilla-extract/css';

export const wrapper = style({
	padding: 4,
	columnGap: 8,
	background: '#eee',
	marginLeft: 24,
	borderRadius: 4,
});

export const radioInput = style({
	display: 'none',
});

export const label = style({
	width: 24,
	height: 24,
	padding: 2,
	borderRadius: 4,
	overflow: 'hidden',
	cursor: 'pointer',
	color: '#999',
	transition: 'color 0.3s ease-in, background 0.3s ease-in',

	':hover': {
		background: 'rgb(255 255 255 / 0.4)',
	},

	selectors: {
		[`${radioInput}:checked + &`]: {
			color: '#333',
			background: '#fff',
		},
	},
});

export const icon = style({
	width: '100%',
	height: '100%',
});
