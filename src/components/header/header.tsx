import { IcoCommandLine } from '@/assets/icons';
import { header, headerIcon } from '@/styles/header.css';

const Header = () => {
	return (
		<header className={`${header} mono`}>
			<IcoCommandLine className={headerIcon} />
			<span>iTerm2 preview</span>
		</header>
	);
};

export default Header;
