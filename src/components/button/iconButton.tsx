import { iconGhostButton, iconTonalButton } from '@/styles/button.css';
import { PropsWithChildren } from 'react';

interface IconButton extends PropsWithChildren {
	size?: 'medium' | 'small';
	variants?: 'tonal' | 'ghost';
}

const IconButton = ({
	size = 'small',
	variants = 'ghost',
	children,
}: IconButton) => {
	return (
		<button
			className={
				variants === 'ghost' ? iconGhostButton[size] : iconTonalButton[size]
			}
		>
			{children}
		</button>
	);
};

export default IconButton;
