import Logo from './Logo';
import BrightMode from '../assets/images/bright-mode.svg';
import UserLogo from '../assets/images/user.svg';

const Navbar = () => {
	return (
		<nav className='nav'>
			<div className='nav__logo'>
				<Logo />
				<p>Your Notes</p>
			</div>

			<div className='nav__buttons'>
				<button>Ar</button>
				<button>
					<img src={BrightMode} alt='dark-mode' />
				</button>
				<button>
					<img src={UserLogo} alt='user' />
				</button>
			</div>
		</nav>
	);
};
export default Navbar;
