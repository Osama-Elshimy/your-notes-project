import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
	registerUserStart,
	registerUserSuccess,
	registerUserFailure,
} from '../store/reducers/user';

import { Logo, FormRow } from '../components';

const initialState = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
	phone: '',
	birthYear: '',
	isMember: true,
};

const Register = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.user);

	const [values, setValues] = useState(initialState);
	const [step, stetStep] = useState(1);

	const handleRegister = e => {
		e.preventDefault();

		if (step === 1) {
			stetStep(2);
		} else {
			// Send data to server
		}

		dispatch(registerUserStart());
		// Perform your API request or async logic for user registration
		// Example: axios.post('/api/register', { username, password })
		// Replace the above line with your actual implementation

		// Simulate success
		setTimeout(() => {
			const user = { id: 1, username: values.username }; // Replace with actual response from the server
			dispatch(registerUserSuccess(user));
		}, 2000);

		// Simulate failure
		// dispatch(registerUserFailure('Registration failed')); // Uncomment this line to simulate failure
	};

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const toggleMember = () => {
		if (step === 2) stetStep(1);

		setValues({ ...values, isMember: !values.isMember });
	};

	return (
		<section className='register'>
			<div className='register__logo'>
				<Logo width='7rem' height='7rem' />
				<h1>Your Notes</h1>
			</div>

			<div className='register__form'>
				<form className='form'>
					<h2>{step === 1 ? 'Signup' : 'Complete Signup'}</h2>

					{step === 1 && (
						<FormRow
							type='email'
							name='email'
							value={values.email}
							handleChange={handleChange}
						/>
					)}

					{step === 1 && (
						<FormRow
							type='password'
							name='password'
							value={values.password}
							handleChange={handleChange}
						/>
					)}

					{step === 1 && !values.isMember && (
						<FormRow
							labelText='Confirm Password'
							type='password'
							name='confirmPassword'
							value={values.confirmPassword}
							handleChange={handleChange}
						/>
					)}

					{step === 2 && !values.isMember && (
						<FormRow
							type='text'
							name='username'
							value={values.username}
							handleChange={handleChange}
						/>
					)}

					{step === 2 && !values.isMember && (
						<FormRow
							type='text'
							name='phone'
							value={values.phone}
							handleChange={handleChange}
						/>
					)}

					{step === 2 && !values.isMember && (
						<FormRow
							labelText='Birth Year'
							type='text'
							name='birthYear'
							value={values.birthYear}
							handleChange={handleChange}
							max={new Date().getFullYear()}
							min={1900}
						/>
					)}

					{!values.isMember && (
						<button
							className='btn btn-block'
							type='submit'
							onClick={handleRegister}>
							Complete Signup{' '}
							<svg
								width='17'
								height='17'
								viewBox='0 0 17 17'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M1.93848 8.5H15.9385'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M8.93848 1.5L15.9385 8.5L8.93848 15.5'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					)}

					{step === 2 && (
						<button
							className='btn btn-block'
							type='button'
							onClick={() => stetStep(1)}>
							Back
							<svg
								width='17'
								height='17'
								viewBox='0 0 17 17'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M15.9385 8.5L1.93848 8.5'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M8.93848 15.5L1.93848 8.5L8.93848 1.5'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					)}
				</form>
				<p>
					{!values.isMember ? 'Already a member?' : "Don't have an account?"}
				</p>
				<button className='btn btn-switch' onClick={toggleMember}>
					{values.isMember ? 'Signup' : 'Login'}
				</button>
			</div>
		</section>
	);
};

export default Register;
