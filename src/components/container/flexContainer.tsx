import { flexContainer } from '@/styles/container.css';
import { PropsWithChildren } from 'react';

const FlexContainer = ({ children }: PropsWithChildren) => {
	return <div className={flexContainer}>{children}</div>;
};

export default FlexContainer;
