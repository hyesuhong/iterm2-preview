import { main } from '@/styles/container.css';
import { PropsWithChildren } from 'react';

const MainContainer = ({ children }: PropsWithChildren) => {
	return <main className={main}>{children}</main>;
};

export default MainContainer;
