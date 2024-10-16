import { input } from '@/styles/searchScheme.css';
import { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
	return (
		<input
			type='text'
			placeholder={placeholder}
			className={input}
			value={value}
			onChange={onChange}
		/>
	);
};

export default SearchInput;
