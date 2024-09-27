import { label, radioInput } from '@/styles/selectLightness.css';
import { PropsWithChildren, useId } from 'react';

interface LightnessItemProps extends PropsWithChildren {
	value: string;
}

const LightnessItem = ({ value, children }: LightnessItemProps) => {
	const id = useId();
	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		console.log(ev.target.value);
	};
	return (
		<>
			<input
				type='radio'
				name='lightness'
				id={id}
				value={value}
				className={radioInput}
				onChange={onChange}
			/>
			<label htmlFor={id} className={label}>
				{children}
			</label>
		</>
	);
};

export default LightnessItem;
