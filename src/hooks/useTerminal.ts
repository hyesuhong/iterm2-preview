import { ITerminalOptions, Terminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';

interface UseTerminal {
	options: ITerminalOptions;
}

const initialDisplay = `
 ┌ \x1B[01mFeatures\x1B[0m ──────────────────────────────────────────────────────────────────┐\r
 │                                                                            │\r
 │ - \x1B[32mSearch\x1B[0m by name                                                           │\r
 │                                                                            │\r
 │ - \x1B[34mFilter\x1B[0m by appearance                                                     │\r
 │                                                                            │\r
 │ - \x1B[35mDownload\x1B[0m if you find a scheme you like                                   │\r
 │                                                                            │\r
 └────────────────────────────────────────────────────────────────────────────┘\r
 \r
 This sample is a simulator.\r
 Try running 'help', then you can check available commands.\r
 \r
 $ `;

const useTerminal = <T extends HTMLElement>({ options }: UseTerminal) => {
	const terminalRef = useRef<Terminal | null>(null);
	const wrapperRef = useRef<T>(null);

	useEffect(() => {
		if (wrapperRef.current) {
			const terminal = new Terminal(options);

			terminal.open(wrapperRef.current);
			terminal.write(initialDisplay);
			terminal.onData((data) => {
				const targetCode = data.charCodeAt(0);
				if (targetCode === 13) {
					terminal.write('\r\n$ ');
					return;
				}
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
	}, [wrapperRef]);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.options = options;
		}
	}, [options]);

	return { ref: wrapperRef };
};

export default useTerminal;
