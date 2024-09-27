import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
	margin: 0,
	padding: 0,
	boxSizing: 'border-box',
});

globalStyle('body', {
	background: '#f5f5f5',
});

globalStyle('a', {
	textDecoration: 'none',
	color: 'inherit',
});

globalStyle('ul li, ol li', {
	listStyle: 'none',
});

globalStyle('img', {
	verticalAlign: 'middle',
});

globalStyle('button', {
	cursor: 'pointer',
});

globalStyle('#root', {
	width: '100vw',
	height: '100vh',
	display: 'grid',
	gridTemplateRows: 'min-content minmax(0, 1fr)',
	rowGap: 24,
});
