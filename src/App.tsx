import { Header } from '@/components/header';
import {
	FlexContainer,
	MainContainer,
	SectionContainer,
} from './components/container';
import { SearchSchemeForm } from './components/searchScheme';
import { SelectLightness } from './components/selectLightness';

function App() {
	return (
		<>
			<Header />
			<MainContainer>
				<SectionContainer growSize='big'>preview</SectionContainer>
				<SectionContainer>
					<FlexContainer>
						<SearchSchemeForm />
						<SelectLightness />
					</FlexContainer>
				</SectionContainer>
			</MainContainer>
		</>
	);
}

export default App;
