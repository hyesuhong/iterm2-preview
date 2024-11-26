import { HTMLAttributes } from 'react';

const All = ({ className }: HTMLAttributes<SVGSVGElement>) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M6.13281 16H4.23438L7.17578 7.51562H9.4375L12.3672 16H10.4805L9.8418 14.043H6.77148L6.13281 16ZM7.2168 12.6719H9.39648L8.33594 9.42578H8.27734L7.2168 12.6719ZM15.0273 7.51562V16H13.293V7.51562H15.0273ZM18.1094 7.51562V16H16.375V7.51562H18.1094Z'
				fill='currentColor'
			/>
		</svg>
	);
};

export default All;
