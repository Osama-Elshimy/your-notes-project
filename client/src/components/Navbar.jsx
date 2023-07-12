import { useAppContext } from '../context/appContext';
import { useTranslation } from 'react-i18next';

import Logo from './Logo';
import BrightModeLogo from '/assets/images/bright-mode.svg';
import DarkModeLogo from '/assets/images/dark-mode.svg';
import UserLogo from '/assets/images/user.svg';

const Navbar = () => {
	const { t, i18n } = useTranslation();
	const { openModal, closeModal, isModalOpen, isDarkMode, toggleDarkMode } =
		useAppContext();

	const handleOpenModal = () => {
		if (isModalOpen) {
			closeModal();
			return;
		} else {
			openModal();
			return;
		}
	};

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
		const html = document.documentElement;
		html.lang = i18n.language;
		html.classList.toggle('arabic');
	};

	return (
		<nav className='nav'>
			<div className='nav__logo'>
				<Logo />
				<p>{t('title')}</p>
			</div>

			<div className='nav__buttons'>
				<button onClick={toggleLanguage}>{t('language')}</button>

				<button className='nav__dark-mode-button' onClick={toggleDarkMode}>
					<img
						src={isDarkMode ? DarkModeLogo : BrightModeLogo}
						alt='dark-mode'
					/>
				</button>
				<button className='nav__user-button' onClick={handleOpenModal}>
					<img src={UserLogo} alt='user' />
				</button>
			</div>
		</nav>
	);
};
export default Navbar;
