import useTerminal from '@/hooks/useTerminal';
import { jetBrainsMono } from '@/styles/font.css';
import { backgroundVar, wrapper } from '@/styles/webTerminal.css';
import { Scheme } from '@/types/scheme';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ITerminalInitOnlyOptions, ITerminalOptions } from '@xterm/xterm';

import '@xterm/xterm/css/xterm.css';
import { useEffect, useState } from 'react';

const initialOptions: ITerminalOptions & ITerminalInitOnlyOptions = {
	allowTransparency: true,
	cursorBlink: true,
	cursorStyle: 'block',
	fontFamily: `${jetBrainsMono}, monospace`,
	fontSize: 14,
};

interface WebTerminalProps {
	scheme?: Scheme | null;
}

const WebTerminal = ({ scheme }: WebTerminalProps) => {
	const [options, setOptions] = useState(initialOptions);
	const { ref } = useTerminal<HTMLDivElement>({ options });

	useEffect(() => {
		setOptions((prev) => ({ ...prev, theme: scheme?.colorScheme }));
	}, [scheme]);

	return (
		<>
			<div
				className={`${wrapper}`}
				ref={ref}
				style={assignInlineVars({
					[backgroundVar]: scheme?.colorScheme.background,
				})}
			/>
		</>
	);
};

export default WebTerminal;
