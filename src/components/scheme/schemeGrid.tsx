import { schemeGrid } from '@/styles/scheme.css';
import { PropsWithChildren, RefObject } from 'react';

interface SchemeGridProps extends PropsWithChildren {
	gridRef: RefObject<HTMLDivElement>;
}

const SchemeGrid = ({ children, gridRef }: SchemeGridProps) => {
	return (
		<div className={schemeGrid} ref={gridRef}>
			{children}
		</div>
	);
};

export default SchemeGrid;
