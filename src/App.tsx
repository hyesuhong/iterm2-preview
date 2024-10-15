import { Header } from '@/components/header';
import { MouseEvent, useState } from 'react';
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
	const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
	const handleSchemeCardClick = (ev: MouseEvent<HTMLDListElement>) => {
		const {
			currentTarget: { dataset },
		} = ev;

		if (dataset.name) {
			setSelectedScheme(dataset.name);
		}
	};
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
									onClick={handleSchemeCardClick}
									isSelected={selectedScheme === scheme.name}
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
