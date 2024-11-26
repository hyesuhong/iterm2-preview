import { CommandGroup } from '@/types/web-terminal';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { ITerminalOptions, Terminal } from '@xterm/xterm';

export default class WebTerminal {
	private terminal: Terminal;
	private input: string = '';

	private fitAddon: FitAddon;
	private wegLinksAddon: WebLinksAddon;

	private commands: CommandGroup;

	constructor(options?: ITerminalOptions, commands?: CommandGroup) {
		this.terminal = new Terminal(options);

		this.fitAddon = new FitAddon();
		this.wegLinksAddon = new WebLinksAddon();

		this.commands = commands || {};

		this.init();
	}

	private init() {
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.loadAddon(this.wegLinksAddon);

		this.terminal.onData(this.handleData.bind(this));
	}

	open<WrapperElement extends HTMLElement>(wrapperEl: WrapperElement) {
		this.terminal.open(wrapperEl);
	}

	write(input: string) {
		this.terminal.write(input);
	}

	changeOptions(options: ITerminalOptions) {
		this.terminal.options = options;
	}

	disposeAll() {
		this.wegLinksAddon.dispose();
		this.fitAddon.dispose();
		this.terminal.dispose();
	}

	fit() {
		this.fitAddon.fit();
	}

	private getCommand() {
		const totalCommandLine = this.input.trim();
		const [commandOnly] = totalCommandLine.split(' ');

		return commandOnly;
	}

	private setCommand(input: string) {
		this.input = input;
	}

	private runCommand(command: string) {
		if (command.length < 1 || !(command in this.commands)) {
			return `command not found: ${command}`;
		}

		const result = this.commands[command].func();
		return result;
	}

	private breakLine() {
		this.terminal.write('\r\n');
	}

	private handleData(data: string) {
		switch (data) {
			case '\r': {
				const command = this.getCommand();
				const result = this.runCommand(command);

				this.breakLine();
				this.write(result);
				this.breakLine();
				this.write('$ ');

				this.setCommand('');
				return;
			}
			case '\u007F': {
				this.write('\b \b');
				const slicedCommand = this.input.slice(0, this.input.length - 1);

				this.setCommand(slicedCommand);
				return;
			}
			default: {
				if (
					(data >= String.fromCharCode(0x20) &&
						data <= String.fromCharCode(0x7e)) ||
					data >= '\u00a0'
				) {
					this.setCommand(this.input + data);
					this.write(data);
				}
				return;
			}
		}
	}
}
