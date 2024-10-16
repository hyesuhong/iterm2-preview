import { IconSearch } from '@/assets/icons';
import { form } from '@/styles/searchScheme.css';
import { ChangeEvent, FormEvent } from 'react';
import { IconButton } from '../button';
import SearchInput from './searchInput';

interface SearchSchemeFormProps {
	searchText: string;
	onChangeSearchText: (ev: ChangeEvent<HTMLInputElement>) => void;
	onSearch: (text: string) => void;
}

const SearchSchemeForm = ({
	searchText,
	onChangeSearchText,
	onSearch,
}: SearchSchemeFormProps) => {
	const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		onSearch(searchText);
	};

	return (
		<form className={form} onSubmit={onSubmit}>
			<SearchInput
				value={searchText}
				placeholder='Search scheme by name'
				onChange={onChangeSearchText}
			/>
			<IconButton size='medium' variants='tonal'>
				<IconSearch />
			</IconButton>
		</form>
	);
};

export default SearchSchemeForm;
