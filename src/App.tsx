import { Header } from '@/components/header';
import { MainContainer, SectionContainer } from './components/container';

function App() {
	return (
		<>
			<Header />
			<MainContainer>
				<SectionContainer growSize='big'>preview</SectionContainer>
				<SectionContainer>color list</SectionContainer>
			</MainContainer>
		</>
	);
}

export default App;
