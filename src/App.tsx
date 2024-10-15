import { Header } from '@/components/header';
import {
	FlexContainer,
	MainContainer,
	SectionContainer,
} from './components/container';
import { SchemeCard, SchemeGrid } from './components/scheme';
import { SearchSchemeForm } from './components/searchScheme';
import { SelectLightness } from './components/selectLightness';
import { WebTerminal } from './components/webTerminal';
import schemes from './data/schemes.json';
import { schemeSelectContainer } from './styles/container.css';

function App() {
	return (
		<>
			<Header />
			<MainContainer>
				<SectionContainer growSize='big'>
					<WebTerminal />
				</SectionContainer>
				<SectionContainer>
					<div className={schemeSelectContainer}>
						<FlexContainer>
							<SearchSchemeForm />
							<SelectLightness />
						</FlexContainer>
						<SchemeGrid>
							{schemes.map((scheme) => (
								<SchemeCard
									key={scheme.name}
									name={scheme.name}
									colorScheme={scheme.colorScheme}
									theme={scheme.theme === 'light' ? 'light' : 'dark'}
								/>
							))}
						</SchemeGrid>
					</div>
				</SectionContainer>
			</MainContainer>
		</>
	);
}

export default App;
