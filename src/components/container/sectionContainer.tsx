import { section } from '@/styles/container.css';
import { PropsWithChildren } from 'react';

interface SectionContainerProps extends PropsWithChildren {
	growSize?: 'big' | 'small';
}

const SectionContainer = ({
	growSize = 'small',
	children,
}: SectionContainerProps) => {
	return <section className={section[growSize]}>{children}</section>;
};

export default SectionContainer;
