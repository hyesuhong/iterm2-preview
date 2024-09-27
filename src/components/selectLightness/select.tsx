import { IconMoon, IconSun } from '@/assets/icons';
import { wrapper } from '@/styles/selectLightness.css';
import { FlexContainer } from '../container';
import LightnessItem from './lightnessItem';

const Select = () => {
	return (
		<FlexContainer className={wrapper}>
			<LightnessItem value=''>All</LightnessItem>
			<LightnessItem value='light'>
				<IconSun />
			</LightnessItem>
			<LightnessItem value='dark'>
				<IconMoon />
			</LightnessItem>
		</FlexContainer>
	);
};

export default Select;
