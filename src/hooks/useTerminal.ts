import { ITerminalOptions, Terminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';

interface UseTerminal {
	options: ITerminalOptions;
}

const initialDisplay = `\r
┌ Features ───────────────────────────────────┐\r
│                                             │\r
│ - \x1B[32mSearch\x1B[0m by name                            │\r
│                                             │\r
│ - \x1B[34mFilter\x1B[0m by appearance                      │\r
│                                             │\r
│ - \x1B[35mDownload\x1B[0m if you find a scheme you like    │\r
│                                             │\r
└─────────────────────────────────────────────┘\r
\r
This sample is a simulator.\r
Try running 'help', then you can check available commands.\r
\r
$ `;

const useTerminal = <T extends HTMLElement>({ options }: UseTerminal) => {
	const terminalRef = useRef<Terminal | null>(null);
	const wrapperRef = useRef<T>(null);
	const commandRef = useRef('');

	const getCommand = () => {
		console.log(commandRef);
		const totalCommandLine = commandRef.current;
		const [commandOnly] = totalCommandLine.split(' ');

		return commandOnly;
	};

	const setCommand = (newCommand: string) => {
		commandRef.current = newCommand;
	};

	useEffect(() => {
		if (wrapperRef.current) {
			const terminal = new Terminal(options);

			terminal.open(wrapperRef.current);
			terminal.write(initialDisplay);
			terminal.onKey(({ domEvent }) => {
				const { key } = domEvent;
				if (key === 'Enter') {
					const command = getCommand();
					// do something with command
					// terminal.write('\r\n$ ');

					setCommand('');
					return;
				} else if (key === 'Backspace') {
					terminal.write('\b \b');
					const slicedCommand = commandRef.current.slice(
						0,
						commandRef.current.length - 1
					);

					setCommand(slicedCommand);
					return;
				}

				terminal.write(key);
				setCommand(commandRef.current + key);
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
