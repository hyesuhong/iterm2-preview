import { IconMoon, IconSun } from '@/assets/icons';
import { wrapper } from '@/styles/selectLightness.css';
import { Theme } from '@/types/scheme';
import { FlexContainer } from '../container';
import LightnessItem from './lightnessItem';

interface SelectProps {
	selectedTheme?: '' | 'light' | 'dark';
	onChange: (theme: Theme) => void;
}

const themes = [
	{ value: '', children: 'All' },
	{ value: 'light', children: <IconSun /> },
	{ value: 'dark', children: <IconMoon /> },
];

const Select = ({ selectedTheme = '', onChange }: SelectProps) => {
	return (
		<FlexContainer className={wrapper}>
			{themes.map((theme) => (
				<LightnessItem
					key={theme.value}
					value={theme.value}
					onChange={onChange}
					checked={selectedTheme === theme.value}
				>
					{theme.children}
				</LightnessItem>
			))}
		</FlexContainer>
	);
};

export default Select;
