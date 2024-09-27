import { style, styleVariants } from '@vanilla-extract/css';

const buttonBase = style({
	border: 'none',
	outline: 'none',
	background: 'transparent',
	padding: 4,
	borderRadius: 4,
});

const ghostBase = style({
	color: '#999',
	transition: 'color 0.3s ease-in, background 0.3s ease-in',
	':hover': {
		color: '#333',
		background: '#eee',
	},
});

const tonalBase = style({
	color: '#999',
	transition: 'color 0.3s ease-in',
	':hover': {
		color: '#333',
	},
});

const iconSize = {
	medium: 32,
	small: 24,
};

export const iconGhostButton = styleVariants(iconSize, (iconSize) => [
	buttonBase,
	ghostBase,
	{ width: iconSize, height: iconSize },
]);

export const iconTonalButton = styleVariants(iconSize, (iconSize) => [
	buttonBase,
	tonalBase,
	{ width: iconSize, height: iconSize },
]);
