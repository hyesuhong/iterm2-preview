import { iconGhostButton, iconTonalButton } from '@/styles/button.css';
import { MouseEvent, PropsWithChildren } from 'react';

interface IconButton extends PropsWithChildren {
	size?: 'medium' | 'small';
	variants?: 'tonal' | 'ghost';
	onClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({
	size = 'small',
	variants = 'ghost',
	children,
	onClick,
}: IconButton) => {
	return (
		<button
			className={
				variants === 'ghost' ? iconGhostButton[size] : iconTonalButton[size]
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default IconButton;
