import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import attachCookie from '../utils/attachCookie.js';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
	const { username, email, password, confirmPassword, phone, bearthYear } =
		req.body;

	if (
		!username ||
		!email ||
		!password ||
		!confirmPassword ||
		!phone ||
		!bearthYear
	) {
		throw new BadRequestError('please provide all values');
	}

	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError('Email already in use');
	}

	if (password !== confirmPassword) {
		throw new BadRequestError('Passwords do not match');
	}

	const user = await User.create({
		username,
		email,
		password,
		confirmPassword,
		phone,
		bearthYear,
	});

	const token = user.createJWT();
	attachCookie({ res, token });

	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			username: user.username,
			phone: user.phone,
			bearthYear: user.bearthYear,
		},
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Please provide all values');
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		throw new UnAuthenticatedError('No user with that email found');
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnAuthenticatedError('Password is not correct');
	}

	const token = user.createJWT();
	attachCookie({ res, token });
	user.password = undefined;

	res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
	const { email, username, password, confirmPassword, phone, bearthYear } =
		req.body;
	if (
		!email ||
		!username ||
		!password ||
		!confirmPassword ||
		!phone ||
		!bearthYear
	) {
		throw new BadRequestError('Please provide all values');
	}

	if (password !== confirmPassword) {
		throw new BadRequestError('Passwords do not match');
	}

	const user = await User.findOne({ _id: req.user.userId }).select('+password');

	user.email = email;
	user.username = username;
	user.password = password;
	user.confirmPassword = confirmPassword;
	user.phone = phone;
	user.bearthYear = bearthYear;

	await user.save();

	const token = user.createJWT();
	attachCookie({ res, token });

	user.password = undefined;

	res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	res.status(StatusCodes.OK).json({ user });
};

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});
	res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export { register, login, updateUser, getCurrentUser, logout };
