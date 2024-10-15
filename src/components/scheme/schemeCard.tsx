import {
	schemeCard,
	schemeCssVars,
	schemeCursor,
	schemeDisplay,
	schemeName,
	schemeText,
} from '@/styles/scheme.css';
import { Scheme } from '@/types/scheme';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import ColorChart from './colorChart';

interface SchemeCardProps extends Scheme {
	isSelected?: boolean;
}

const SchemeCard = ({
	name,
	colorScheme,
	theme,
	isSelected,
}: SchemeCardProps) => {
	return (
		<dl
			className={schemeCard}
			style={assignInlineVars(schemeCssVars, {
				background: colorScheme.background || '',
				foreground: colorScheme.foreground || '',
				cursor: colorScheme.cursor || '',
				selection: {
					background: colorScheme.selectionBackground || '',
					foreground: colorScheme.selectionForeground || '',
				},
				ansi: {
					black: colorScheme.black || '',
					red: colorScheme.red || '',
					green: colorScheme.green || '',
					yellow: colorScheme.yellow || '',
					blue: colorScheme.blue || '',
					magenta: colorScheme.magenta || '',
					cyan: colorScheme.cyan || '',
					white: colorScheme.white || '',
					brightBlack: colorScheme.brightBlack || '',
					brightRed: colorScheme.brightRed || '',
					brightGreen: colorScheme.brightGreen || '',
					brightYellow: colorScheme.brightYellow || '',
					brightBlue: colorScheme.brightBlue || '',
					brightMagenta: colorScheme.brightMagenta || '',
					brightCyan: colorScheme.brightCyan || '',
					brightWhite: colorScheme.brightWhite || '',
				},
			})}
		>
			<dd className={`${schemeDisplay} mono`}>
				<ColorChart />
				<p className={schemeText}>
					$ echo "{name}"
					<span className={schemeCursor} />
				</p>
			</dd>
			<dt className={schemeName}>{name}</dt>
		</dl>
	);
};

export default SchemeCard;
