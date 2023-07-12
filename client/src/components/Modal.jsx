// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Modal = () => {
	const navigate = useNavigate();
	// const [isInsideModifyPage, setIsInsideModifyPage] = useState(false);

	const { openModal, closeModal, isModalOpen, user, logoutUser } =
		useAppContext();

	return (
		isModalOpen && (
			<div className='nav__modal' onClick={e => e.stopPropagation()}>
				<h3>{'Hi ' + user.username + '!'}</h3>
				<button
					className='btn btn-block nav__mode-info-btn'
					onClick={() => {
						navigate('/modifyuser');
						closeModal();
					}}>
					Modify User Info
				</button>
				<button
					className='btn btn-block nav__mode-info-btn'
					onClick={() => {
						navigate('/');
						closeModal();
					}}>
					Home Page
				</button>
				<button className='btn btn-block' type='submit' onClick={logoutUser}>
					Logout
				</button>
			</div>
		)
	);
};

export default Modal;
