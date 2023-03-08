const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		console.log('UserId param not sent with request');
		return res.sendStatus(400);
	}

	var isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate('users', '-password')
		.populate('latestMessage');

	isChat = await User.populate(isChat, {
		path: 'latestMessage.sender',
		select: 'name avatar email',
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} else {
		var chatData = {
			chatName: 'sender',
			isGroupChat: false,
			users: [req.user._id, userId],
		};

		try {
			const createdChat = await Chat.create(chatData);
			const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
				'users',
				'-password'
			);
			res.status(200).json(FullChat);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
});

//@description Fetch all chats of user
//@route       GET /api/chat/
//@access      Protected
const getChats = asyncHandler(async (req, res) => {
	const chats = await Chat.find({
		users: { $elemMatch: { $eq: req.user._id } },
	})
		.populate('users', '-password')
		.populate('latestMessage')
		.populate('groupAdmin', '-password')
		.sort({ updatedAt: -1 });

	const populatedChats = await User.populate(chats, {
		path: 'latestMessage.sender',
		select: 'name avatar email',
	});

	res.status(200).json(populatedChats);
});

//@description Create Group Chat
//@route       POST /api/chat/group
//@access      Protected
const createGroupChat = asyncHandler(async (req, res) => {
	const { chatName, users, groupDescription } = req.body;

	if (!chatName || !users) {
		console.log('chatName or users param not sent with request');
		return res.sendStatus(400);
	}

	if (users.length < 2) {
		res.status(400);
		throw new Error('Please select atleast 2 users');
	}

	const chatData = {
		chatName,
		groupChat: true,
		users: [...users, req.user._id],
		groupAdmin: req.user._id,
		groupDescription,
	};

	try {
		const createdChat = await Chat.create(chatData);
		const FullChat = await Chat.findOne({ _id: createdChat._id })
			.populate('users', '-password')
			.populate('groupAdmin', '-password');
		res.status(200).json(FullChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//@description Edit group info
//@route       PUT /api/chat/group
//@access      Protected
const editGroupInfo = asyncHandler(async (req, res) => {
	const { chatId, chatName, groupDescription } = req.body;

	if (!chatId || !chatName) {
		console.log('chatId, chatName param not sent with request');
		return res.sendStatus(400);
	}

	const chatData = {
		chatName,
		groupDescription,
		groupAdmin: req.user._id,
	};

	try {
		const chat = await Chat.findById(chatId);
		if (!chat.groupChat) {
			res.status(400);
			throw new Error('This is not a group chat');
		}

		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{
				$set: chatData,
			},
			{
				new: true,
			}
		);

		const FullChat = await Chat.findOne({ _id: updatedChat._id })
			.populate('users', '-password')
			.populate('groupAdmin', '-password');
		res.status(200).json(FullChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//@description delete group
//@route       DELETE /api/chat
//@access      Protected
const deleteChat = asyncHandler(async (req, res) => {
	const { chatId } = req.body;

	if (!chatId) {
		console.log('chatId param not sent with request');
		return res.sendStatus(400);
	}

	try {
		await Chat.findByIdAndDelete(chatId);

		res.status(200).json({ message: 'Chat Deleted' });
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//@description Add Users to Group
//@route       PUT /api/chat/group/add
//@access      Protected
const addUsersToGroup = asyncHandler(async (req, res) => {
	const { chatId, users } = req.body;

	if (!chatId || users.length < 1) {
		console.log('chatId or users param not sent with request');
		return res.sendStatus(400);
	}

	try {
		const chat = await Chat.findById(chatId);
		console.log(chat.groupAdmin === req.user._id);
		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{
				$push: { users: { $each: users } },
			},
			{
				new: true,
			}
		);

		const FullChat = await Chat.findOne({ _id: updatedChat._id })
			.populate('users', '-password')
			.populate('groupAdmin', '-password');
		res.status(200).json(FullChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//@description Remove Users from Group
//@route       PUT /api/chat/group/remove
//@access      Protected
const removeUsersFromGroup = asyncHandler(async (req, res) => {
	const { chatId, users } = req.body;

	if (!chatId || !users) {
		console.log('chatId or users param not sent with request');
		return res.sendStatus(400);
	}

	try {
		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{
				$pull: { users: { $in: users } },
			},
			{
				new: true,
			}
		);

		const FullChat = await Chat.findOne({ _id: updatedChat._id })
			.populate('users', '-password')
			.populate('groupAdmin', '-password');
		res.status(200).json(FullChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = {
	accessChat,
	getChats,
	createGroupChat,
	editGroupInfo,
	deleteChat,
	addUsersToGroup,
	removeUsersFromGroup,
};
