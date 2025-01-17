import { createContainer, style, styleVariants } from '@vanilla-extract/css';

export const main = style({
	display: 'flex',
	gap: '0 24px',
	padding: '0 24px 40px',
});

const sectionBase = style({
	background: '#ffffff',
	borderRadius: 16,
	overflow: 'hidden',
	boxShadow: '4px 4px 12px rgb(100 100 100 /0.1)',
});

export const section = styleVariants({
	big: [
		sectionBase,
		{
			flex: 2,
		},
	],
	small: [
		sectionBase,
		{
			flex: 1,
			padding: 16,
		},
	],
});

export const flexContainer = style({
	display: 'flex',
});

export const schemeListContainer = createContainer();

export const schemeSelectContainer = style({
	display: 'grid',
	gridTemplateRows: 'min-content minmax(0, 1fr)',
	rowGap: 24,
	height: '100%',
	containerName: schemeListContainer,
	containerType: 'size',
});
