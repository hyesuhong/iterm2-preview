import { IconSearch } from '@/assets/icons';
import { form } from '@/styles/searchScheme.css';
import { IconButton } from '../button';
import SearchInput from './searchInput';

const SearchSchemeForm = () => {
	return (
		<form action='' className={form}>
			<SearchInput />
			<IconButton size='medium' variants='tonal'>
				<IconSearch />
			</IconButton>
		</form>
	);
};

export default SearchSchemeForm;
