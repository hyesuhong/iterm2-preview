import { input } from '@/styles/searchScheme.css';
import { InputHTMLAttributes } from 'react';

const SearchInput = ({
	value,
	onChange,
	placeholder,
}: InputHTMLAttributes<HTMLInputElement>) => {
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
