import useTerminal from '@/hooks/useTerminal';
import { wrapper } from '@/styles/webTerminal.css';

import '@xterm/xterm/css/xterm.css';

const WebTerminal = () => {
	const { ref } = useTerminal<HTMLDivElement>();

	return (
		<>
			<div className={wrapper} ref={ref}></div>
		</>
	);
};

export default WebTerminal;
