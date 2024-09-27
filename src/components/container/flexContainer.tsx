import { flexContainer } from '@/styles/container.css';
import { PropsWithChildren } from 'react';

interface FlexContainerProps extends PropsWithChildren {
	className?: string;
}

const FlexContainer = ({ className, children }: FlexContainerProps) => {
	return (
		<div className={`${flexContainer} ${className || ''}`}>{children}</div>
	);
};

export default FlexContainer;
