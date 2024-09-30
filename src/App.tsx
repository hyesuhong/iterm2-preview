import { Header } from '@/components/header';
import {
	FlexContainer,
	MainContainer,
	SectionContainer,
} from './components/container';
import { SchemeCard, SchemeGrid } from './components/scheme';
import { SearchSchemeForm } from './components/searchScheme';
import { SelectLightness } from './components/selectLightness';
import { schemeSelectContainer } from './styles/container.css';

const dummyData = new Array(20).fill(0).map((_, index) => index);

function App() {
	return (
		<>
			<Header />
			<MainContainer>
				<SectionContainer growSize='big'>preview</SectionContainer>
				<SectionContainer>
					<div className={schemeSelectContainer}>
						<FlexContainer>
							<SearchSchemeForm />
							<SelectLightness />
						</FlexContainer>
						<SchemeGrid>
							{dummyData.map((d) => (
								<SchemeCard key={d} />
							))}
						</SchemeGrid>
					</div>
				</SectionContainer>
			</MainContainer>
		</>
	);
}

export default App;
