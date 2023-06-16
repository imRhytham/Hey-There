const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, avatar } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please enter all fields');
	}

	//check if user exist
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
		avatar,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			avatar: user.avatar,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('User not found');
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			avatar: user.avatar,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

const searchUser = asyncHandler(async (req, res) => {
	const { name } = req.query;

	if (name === '') {
		res.json([]);
		return;
	}

	const keyword = name
		? {
				$or: [
					{
						name: { $regex: name, $options: 'i' },
					},
					{
						email: { $regex: name, $options: 'i' },
					},
				],
		  }
		: {};

	const user = await User.find(keyword)
		.find({ _id: { $ne: req.user._id } })
		.select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const editUser = asyncHandler(async (req, res) => {
	const { name, avatar, status } = req.body;
	const user = await User.findById(req.body._id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.name = name || user.name;
	user.avatar = avatar || user.avatar;
	user.status = status || user.status;

	const updatedUser = await User.findByIdAndUpdate(req.body._id, {
		$set: user,
	});
	res.json({ message: 'success', data: updatedUser });
});

module.exports = { registerUser, loginUser, searchUser, editUser };
