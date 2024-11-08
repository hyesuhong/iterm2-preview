import { initialDisplay, runCommand } from '@/utils/terminal';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { ITerminalOptions, Terminal } from '@xterm/xterm';
import { useEffect, useRef } from 'react';

interface UseTerminal {
	options: ITerminalOptions;
}

const useTerminal = <T extends HTMLElement>({ options }: UseTerminal) => {
	const terminalRef = useRef<Terminal | null>(null);
	const fitAddonRef = useRef<FitAddon | null>(null);
	const webLinksAddonRef = useRef<WebLinksAddon | null>(null);

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

	const fitTerminal = () => {
		if (fitAddonRef.current) {
			fitAddonRef.current.fit();
		}
	};

	useEffect(() => {
		if (wrapperRef.current) {
			const terminal = new Terminal(options);
			const fitAddon = new FitAddon();
			const webLinksAddon = new WebLinksAddon();

			terminal.loadAddon(fitAddon);
			terminal.loadAddon(webLinksAddon);
			terminal.open(wrapperRef.current);

			terminal.write(initialDisplay);
			terminal.onData((data) => {
				switch (data) {
					case '\r': {
						const command = getCommand();
						const result = runCommand(command);

						breakLine(terminal);
						terminal.write(result);
						breakLine(terminal);
						terminal.write('$ ');

						setCommand('');
						return;
					}
					case '\u007F': {
						terminal.write('\b \b');
						const slicedCommand = commandRef.current.slice(
							0,
							commandRef.current.length - 1
						);

						setCommand(slicedCommand);
						return;
					}
					default: {
						if (
							(data >= String.fromCharCode(0x20) &&
								data <= String.fromCharCode(0x7e)) ||
							data >= '\u00a0'
						) {
							setCommand(commandRef.current + data);
							terminal.write(data);
						}
						return;
					}
				}
			});

			terminalRef.current = terminal;
			fitAddonRef.current = fitAddon;
			webLinksAddonRef.current = webLinksAddon;

			fitTerminal();
		}

		return () => {
			terminalRef.current && terminalRef.current.dispose();
			terminalRef.current = null;

			fitAddonRef.current && fitAddonRef.current.dispose();
			fitAddonRef.current = null;

			webLinksAddonRef.current && webLinksAddonRef.current.dispose();
			webLinksAddonRef.current = null;
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
