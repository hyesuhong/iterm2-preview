import { style, styleVariants } from '@vanilla-extract/css';

export const main = style({
	display: 'flex',
	gap: '0 24px',
	padding: '0 24px',
	marginTop: 40,
});

// export const section = style({
// 	flex: 'var(--flex-size)',
// });

export const section = styleVariants({
	big: {
		flex: 3,
	},
	small: {
		flex: 1,
	},
});
