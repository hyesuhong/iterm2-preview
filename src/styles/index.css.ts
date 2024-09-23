import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
	margin: 0,
	padding: 0,
	boxSizing: 'border-box',
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
