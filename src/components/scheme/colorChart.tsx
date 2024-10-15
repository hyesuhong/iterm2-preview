import { colorChart, colorChartItem } from '@/styles/scheme.css';
import { Scheme } from '@/types/scheme';

type ColorScheme = Scheme['colorScheme'];
type ColorKey = keyof ColorScheme;

const ansiColorKeys: ColorKey[] = [
	'black',
	'red',
	'green',
	'yellow',
	'blue',
	'magenta',
	'cyan',
	'white',
	'brightBlack',
	'brightRed',
	'brightGreen',
	'brightYellow',
	'brightBlue',
	'brightMagenta',
	'brightCyan',
	'brightWhite',
];

const ColorChart = () => {
	return (
		<ul className={colorChart}>
			{ansiColorKeys.map((ansiColorKey) => (
				<li
					key={ansiColorKey}
					className={`${colorChartItem} ansi_${ansiColorKey}`}
				/>
			))}
		</ul>
	);
};

export default ColorChart;
