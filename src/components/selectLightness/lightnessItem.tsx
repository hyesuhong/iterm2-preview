import { label, radioInput } from '@/styles/selectLightness.css';
import { Theme } from '@/types/scheme';
import { PropsWithChildren, useId } from 'react';

interface LightnessItemProps extends PropsWithChildren {
	value: string;
	checked?: boolean;
	onChange: (theme: Theme) => void;
}

const LightnessItem = ({
	value,
	checked,
	children,
	onChange,
}: LightnessItemProps) => {
	const id = useId();
	const onThemeChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = ev;

		if (value === '' || value === 'light' || value === 'dark') {
			onChange(value);
		}
	};
	return (
		<>
			<input
				type='radio'
				name='lightness'
				id={id}
				value={value}
				className={radioInput}
				checked={checked}
				onChange={onThemeChange}
			/>
			<label htmlFor={id} className={label}>
				{children}
			</label>
		</>
	);
};

export default LightnessItem;
