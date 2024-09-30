import { ITerminalOptions, ITheme, Terminal } from '@xterm/xterm';
import { useEffect, useRef, useState } from 'react';

const dummyTheme: ITheme = {
	foreground: '#A6B2C0',
	background: '#333D4C',
	cursor: '#DDB3FF',
	black: '#061A2B',
	brightBlack: '#535455',
	red: '#EA9091',
	brightRed: '#EA9091',
	green: '#7DBD8D',
	brightGreen: '#7DBD8D',
	yellow: '#EAC71D',
	brightYellow: '#EAC71D',
	blue: '#77A8ED',
	brightBlue: '#77A8ED',
	magenta: '#CCA6EC',
	brightMagenta: '#CCA6EC',
	cyan: '#28B99E',
	brightCyan: '#28B99E',
	white: '#E9EAEC',
	brightWhite: '#E9EAEC',
};

const options: ITerminalOptions = {
	allowTransparency: true,
	cursorBlink: true,
	cursorStyle: 'block',
	theme: dummyTheme,
};

const useTerminal = <T extends HTMLElement>() => {
	const [terminal, setTerminal] = useState<Terminal | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const wrapperRef = useRef<T>(null);

	useEffect(() => {
		if (wrapperRef.current && !isLoaded) {
			setIsLoaded(true);

			const terminal = new Terminal(options);
			setTerminal(terminal);

			terminal.open(wrapperRef.current);
			terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
			terminal.onData((data) => {
				console.log(data.charCodeAt(0));
				terminal.write(data);
			});
		}

		return () => {
			if (terminal) {
				terminal.dispose();
				setTerminal(null);
			}
		};
	}, [wrapperRef, isLoaded]);

	return { ref: wrapperRef };
};

export default useTerminal;
