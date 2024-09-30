import { fontFace } from '@vanilla-extract/css';

export const pretendard = fontFace({
	src: 'url(../assets/fonts/pretendard/variable/PretendardVariable.woff2) format("woff2"), local("Pretendard Variable")',
	fontDisplay: 'swap',
});

export const jetBrainsMono = fontFace([
	{
		src: 'url(../assets/fonts/jetBrainsMono/webfonts/JetBrainsMono-Regular.woff2) format("woff2"), local("JetBrains Mono")',
		fontDisplay: 'swap',
		fontWeight: 400,
	},
	{
		src: 'url(../assets/fonts/jetBrainsMono/webfonts/JetBrainsMono-Italic.woff2) format("woff2"), local("JetBrains Mono")',
		fontDisplay: 'swap',
		fontWeight: 400,
		fontStyle: 'italic',
	},
	{
		src: 'url(../assets/fonts/jetBrainsMono/webfonts/JetBrainsMono-Bold.woff2) format("woff2"), local("JetBrains Mono")',
		fontDisplay: 'swap',
		fontWeight: 700,
	},
	{
		src: 'url(../assets/fonts/jetBrainsMono/webfonts/JetBrainsMono-BoldItalic.woff2) format("woff2"), local("JetBrains Mono")',
		fontDisplay: 'swap',
		fontWeight: 700,
		fontStyle: 'italic',
	},
]);
