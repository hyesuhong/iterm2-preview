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

const helpDisplay = `These are commands in this terminal. Let's Try!\r

 \x1B[32mhelp\x1B[0m        Prints this help message\r
 \x1B[32minfo\x1B[0m        Prints this project's information\r
 \x1B[32mgithub\x1B[0m      Open project's github in new tab\r
 `;

const infoDisplay = `Preview for iTerm2's theme.\r

design & develop: Hyesu Hong(https://github.com/hyesuhong)\r
project's github: \r

sources from\r
- iTerm2-Color-Schemes: https://github.com/mbadolato/iTerm2-Color-Schemes\r
- JetBrains Mono: https://www.jetbrains.com/lp/mono/\r
- Pretendard: https://github.com/orioncactus/pretendard\r
- Heroicons: https://heroicons.com\r
`;

const useTerminal = <T extends HTMLElement>({ options }: UseTerminal) => {
	const terminalRef = useRef<Terminal | null>(null);
	const wrapperRef = useRef<T>(null);
	const commandRef = useRef('');

	const getCommand = () => {
		const totalCommandLine = commandRef.current;
		const [commandOnly] = totalCommandLine.split(' ');

		return commandOnly;
	};

	const setCommand = (newCommand: string) => {
		commandRef.current = newCommand;
	};

	const runCommand = (command: string) => {
		switch (command) {
			case 'help':
				return helpDisplay;
			case 'info':
				return infoDisplay;
			case 'github':
				const isSuccessedOpenUrl = open(
					'https://github.com/hyesuhong',
					'_blank'
				);
				return isSuccessedOpenUrl !== null
					? 'Successfully openend github'
					: 'Failed to open github ';
			default:
				return `command not found: ${command}`;
		}
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
					const result = runCommand(command);
					terminal.write('\r\n');
					terminal.write(result);
					terminal.write('\r\n$ ');

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
