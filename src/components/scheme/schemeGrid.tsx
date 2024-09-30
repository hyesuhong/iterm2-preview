import { schemeGrid } from '@/styles/scheme.css';
import { PropsWithChildren } from 'react';

const SchemeGrid = ({ children }: PropsWithChildren) => {
	return <div className={schemeGrid}>{children}</div>;
};

export default SchemeGrid;
