import { createVar, style } from '@vanilla-extract/css';

export const backgroundVar = createVar();

export const wrapper = style({
	height: '100%',
	background: backgroundVar,
	overflowX: 'hidden',
	overflowY: 'auto',
	padding: 20,
});
