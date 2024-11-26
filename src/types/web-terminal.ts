type Command = {
	description: string;
	func: () => string;
};

export type CommandGroup = Record<string, Command>;
