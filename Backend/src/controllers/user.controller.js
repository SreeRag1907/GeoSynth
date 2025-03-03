import mongoose from 'mongoose';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';

const registerUser = AsyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new ApiError(400, 'all Fields are required...');
	}

	const isUserExisted = await User.findOne({ email });

	if (isUserExisted) {
		throw new ApiError(409, 'User Already Existed...');
	}

	const user = await User.create({ name, email, password });

	if (!user) {
		throw new ApiError(400, 'user not created...');
	}

	return res
		.status(200)
		.json(new ApiResponse(200, user, 'user created successfully...'));
});

const loginUser = AsyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if ((!email, !password)) {
		throw new ApiError(400, 'all fields are required...');
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new ApiError(400, 'User is not registered...');
	}

	const isAuthenticated = await user.checkPassword(password);

	if (!isAuthenticated) {
		throw new ApiError(401, 'invalid user Credentials...');
	}

	return res
		.status(201)
		.json(new ApiResponse(201, user, 'user logged in successfully...'));
});

export { registerUser, loginUser };
