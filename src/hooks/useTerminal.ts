import { initialDisplay, runCommand } from '@/utils/terminal';
import { ITerminalOptions, Terminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';

interface UseTerminal {
	options: ITerminalOptions;
}

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

	const breakLine = (terminal: Terminal) => {
		terminal.write('\r\n');
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

					breakLine(terminal);
					terminal.write(result);
					breakLine(terminal);
					terminal.write('$ ');

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
