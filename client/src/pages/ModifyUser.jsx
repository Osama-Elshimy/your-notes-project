import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { Wrapper, Navbar, Card, Modal, FormRow, Alert } from '../components';

const ModifyUser = () => {
	const navigate = useNavigate();

	const { user, showAlert, displayAlert, updateUser } = useAppContext();

	const [username, setUsername] = useState(user?.username);
	const [email, setEmail] = useState(user?.email);
	const [password, setPassword] = useState(user?.password);
	const [phone, setPhone] = useState(user?.phone);
	const [birthYear, setBirthYear] = useState(user?.birthYear);

	const handleSubmit = e => {
		e.preventDefault();
		if ((!username || !email || !password, !phone, !birthYear)) {
			displayAlert();
			return;
		}

		const userId = user._id;

		updateUser({ username, email, password, phone, birthYear, userId });

		setTimeout(() => {
			navigate('/');
		}, 3000);
	};

	return (
		<Wrapper>
			<Navbar />
			<Modal />
			<Card className='card'>
				<h1>Modify User Information</h1>
			</Card>

			<Card className='card card-big'>
				<form onSubmit={handleSubmit}>
					{showAlert && <Alert />}
					<FormRow
						type='email'
						name='email'
						value={email}
						handleChange={e => setEmail(e.target.value)}
					/>
					<FormRow
						type='password'
						name='password'
						value={password}
						handleChange={e => setPassword(e.target.value)}
					/>
					<FormRow
						labelText='username'
						type='text'
						name='username'
						value={username}
						handleChange={e => setUsername(e.target.value)}
					/>
					<FormRow
						type='text'
						name='phone'
						value={phone}
						handleChange={e => setPhone(e.target.value)}
					/>
					<FormRow
						labelText='Birth Year'
						type='text'
						name='birthYear'
						value={birthYear}
						handleChange={e => setBirthYear(e.target.value)}
						max={new Date().getFullYear()}
						min={1900}
					/>

					<button type='submit' className='btn btn-block' onClick={updateUser}>
						Save Changes
					</button>
				</form>
			</Card>
		</Wrapper>
	);
};

export default ModifyUser;
