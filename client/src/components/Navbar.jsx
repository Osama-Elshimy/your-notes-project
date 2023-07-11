import { useAppContext } from '../context/appContext';

import Logo from './Logo';
import BrightModeLogo from '/assets/images/bright-mode.svg';
import DarkModeLogo from '/assets/images/dark-mode.svg';
import UserLogo from '/assets/images/user.svg';

const Navbar = () => {
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

	return (
		<nav className='nav'>
			<div className='nav__logo'>
				<Logo />
				<p>Your Notes</p>
			</div>

			<div className='nav__buttons'>
				<button>Ar</button>
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
