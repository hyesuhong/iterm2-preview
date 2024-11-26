import { IcoDownload } from '@/assets/icons';
import {
	schemeCard,
	schemeCssVars,
	schemeCursor,
	schemeDisplay,
	schemeName,
	schemeNameSpan,
	schemeText,
} from '@/styles/scheme.css';
import { Scheme } from '@/types/scheme';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { HTMLAttributes, MouseEvent } from 'react';
import { IconButton } from '../button';
import ColorChart from './colorChart';

interface SchemeCardProps
	extends Pick<Scheme, 'name' | 'colorScheme'>,
		HTMLAttributes<HTMLDListElement> {
	isSelected?: boolean;
}

const SchemeCard = ({
	name,
	colorScheme,
	isSelected,
	onClick,
}: SchemeCardProps) => {
	const fileName = `${name}.itermcolors`;
	const downloadUrl = `https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/${fileName}`;

	const onClickDownload = async (ev: MouseEvent<HTMLButtonElement>) => {
		ev.stopPropagation();

		try {
			const data = await fetch(downloadUrl);

			if (data.ok) {
				const resBlob = await data.blob();
				const fileURL = URL.createObjectURL(resBlob);
				console.log(resBlob);

				const anchor = document.createElement('a');
				anchor.href = fileURL;
				anchor.target = '_blank';
				anchor.download = fileName;
				document.body.appendChild(anchor);
				anchor.click();
				document.body.removeChild(anchor);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<dl
			className={schemeCard[isSelected ? 'selected' : 'default']}
			data-name={name}
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
			onClick={onClick}
		>
			<dt className={schemeName}>
				<span className={schemeNameSpan}>{name}</span>
				<IconButton onClick={onClickDownload}>
					<IcoDownload />
				</IconButton>
			</dt>
			<dd className={`${schemeDisplay} mono`}>
				<ColorChart />
				<p className={schemeText}>
					$ echo "{name}"
					<span className={schemeCursor} />
				</p>
			</dd>
		</dl>
	);
};

export default SchemeCard;
