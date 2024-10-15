import { ITerminalOptions, Terminal } from '@xterm/xterm';
import { useEffect, useRef, useState } from 'react';

interface UseTerminal {
	options: ITerminalOptions;
}

const useTerminal = <T extends HTMLElement>({ options }: UseTerminal) => {
	const terminalRef = useRef<Terminal | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const wrapperRef = useRef<T>(null);

	useEffect(() => {
		if (wrapperRef.current) {
			setIsLoaded(true);

			const terminal = new Terminal(options);

			terminal.open(wrapperRef.current);
			terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
			terminal.onData((data) => {
				console.log(data.charCodeAt(0));
				terminal.write(data);
			});

			terminalRef.current = terminal;
		}

		return () => {
			if (terminalRef.current) {
				terminalRef.current.dispose();
				terminalRef.current = null;
			}
		};
	}, [wrapperRef, isLoaded]);

	useEffect(() => {
		if (terminalRef.current) {
			console.log(terminalRef.current);
			terminalRef.current.options = options;
		}
	}, [options]);

	return { ref: wrapperRef };
};

export default useTerminal;
