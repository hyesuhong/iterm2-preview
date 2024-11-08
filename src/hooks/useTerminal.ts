import WebTerminal from '@/services/web-terminal';
import { initialDisplay } from '@/utils/terminal';
import { ITerminalOptions } from '@xterm/xterm';
import { useEffect, useRef } from 'react';

interface UseTerminal {
	options: ITerminalOptions;
}

const useTerminal = <T extends HTMLElement>({ options }: UseTerminal) => {
	const terminalRef = useRef<WebTerminal | null>(null);
	const wrapperRef = useRef<T>(null);

	useEffect(() => {
		if (wrapperRef.current) {
			const terminal = new WebTerminal(options);
			terminalRef.current = terminal;

			terminal.open(wrapperRef.current);
			terminal.write(initialDisplay);
			terminal.fit();
		}

		return () => {
			terminalRef.current && terminalRef.current.disposeAll();
			terminalRef.current = null;
		};
	}, [wrapperRef]);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.changeOptions(options);
		}
	}, [options]);

	return { ref: wrapperRef };
};

export default useTerminal;
