import { expect, test } from 'vitest';
import { getAllSchemeFiles, getSchemeByName } from '../scripts/convertSchemes';

test('read all scheme files', async () => {
	expect(await getAllSchemeFiles()).toBe(333);
});

test('get 3024 Day color schemes', async () => {
	const scheme3024Day = {
		colorScheme: {
			background: {
				blue: 0.9686274509803922,
				green: 0.9686274509803922,
				red: 0.9686274509803922,
			},
			black: {
				blue: 0,
				green: 0.011764705882352941,
				red: 0.03529411764705882,
			},
			blue: {
				blue: 0.8941176470588236,
				green: 0.6274509803921569,
				red: 0.00392156862745098,
			},
			brightBlack: {
				blue: 0.3333333333333333,
				green: 0.34509803921568627,
				red: 0.3607843137254902,
			},
			brightBlue: {
				blue: 0.48627450980392156,
				green: 0.49019607843137253,
				red: 0.5019607843137255,
			},
			brightCyan: {
				blue: 0.3254901960784314,
				green: 0.6705882352941176,
				red: 0.803921568627451,
			},
			brightGreen: {
				blue: 0.19607843137254902,
				green: 0.20392156862745098,
				red: 0.22745098039215686,
			},
			brightMagenta: {
				blue: 0.8313725490196079,
				green: 0.8352941176470589,
				red: 0.8392156862745098,
			},
			brightRed: {
				blue: 0.8156862745098039,
				green: 0.7333333333333333,
				red: 0.9098039215686274,
			},
			brightWhite: {
				blue: 0.9686274509803922,
				green: 0.9686274509803922,
				red: 0.9686274509803922,
			},
			brightYellow: {
				blue: 0.2627450980392157,
				green: 0.27058823529411763,
				red: 0.2901960784313726,
			},
			cursor: {
				blue: 0.2627450980392157,
				green: 0.27058823529411763,
				red: 0.2901960784313726,
			},
			cyan: {
				blue: 0.9568627450980393,
				green: 0.8941176470588236,
				red: 0.7098039215686275,
			},
			foreground: {
				blue: 0.2627450980392157,
				green: 0.27058823529411763,
				red: 0.2901960784313726,
			},
			green: {
				blue: 0.3215686274509804,
				green: 0.6352941176470588,
				red: 0.00392156862745098,
			},
			magenta: {
				blue: 0.5803921568627451,
				green: 0.41568627450980394,
				red: 0.6313725490196078,
			},
			red: {
				blue: 0.12549019607843137,
				green: 0.17647058823529413,
				red: 0.8588235294117647,
			},
			selectionBackground: {
				blue: 0.6352941176470588,
				green: 0.6352941176470588,
				red: 0.6470588235294118,
			},
			selectionForeground: {
				blue: 0.2627450980392157,
				green: 0.27058823529411763,
				red: 0.2901960784313726,
			},
			white: {
				blue: 0.6352941176470588,
				green: 0.6352941176470588,
				red: 0.6470588235294118,
			},
			yellow: {
				blue: 0.00784313725490196,
				green: 0.9294117647058824,
				red: 0.9921568627450981,
			},
		},
		name: '3024 Day',
	};

	expect(await getSchemeByName('3024 Day')).toStrictEqual(scheme3024Day);
});
