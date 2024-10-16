import { Header } from '@/components/header';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
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
import { Scheme } from './types/scheme';

function App() {
	const [selectedScheme, setSelectedScheme] = useState<string | null>(
		schemes[0].name
	);
	const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>(
		schemes as Scheme[]
	);
	const [searchText, setSearchText] = useState('');
	const gridRef = useRef<HTMLDivElement>(null);

	const handleSchemeCardClick = (ev: MouseEvent<HTMLDListElement>) => {
		const {
			currentTarget: { dataset },
		} = ev;

		if (dataset.name) {
			setSelectedScheme(dataset.name);
		}
	};

	const handleSearchTextChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = ev;

		setSearchText(value);
	};

	const handleSearch = (text: string) => {
		const regExp = new RegExp(text, 'gi');
		const filteredSchemeArr = schemes.filter((scheme) =>
			scheme.name.match(regExp)
		);
		setFilteredSchemes(filteredSchemeArr as Scheme[]);
		setSelectedScheme(filteredSchemeArr[0].name);

		gridRef.current?.scrollTo({ top: 0 });
	};

	const getSelectedScheme = (name: string | null) => {
		const targetScheme = schemes.find((scheme) => scheme.name === name);
		if (!(name && targetScheme)) {
			return null;
		}
		return targetScheme as Scheme;
	};

	return (
		<>
			<Header />
			<MainContainer>
				<SectionContainer growSize='big'>
					<WebTerminal scheme={getSelectedScheme(selectedScheme)} />
				</SectionContainer>
				<SectionContainer>
					<div className={schemeSelectContainer}>
						<FlexContainer>
							<SearchSchemeForm
								searchText={searchText}
								onChangeSearchText={handleSearchTextChange}
								onSearch={handleSearch}
							/>
							<SelectLightness />
						</FlexContainer>
						<SchemeGrid gridRef={gridRef}>
							{filteredSchemes.map((scheme) => (
								<SchemeCard
									key={scheme.name}
									name={scheme.name}
									colorScheme={scheme.colorScheme}
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
