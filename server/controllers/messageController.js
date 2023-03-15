const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');

//@desc Send Message
//@route POST /api/messages
//@access Protected
const sendMessage = asyncHandler(async (req, res) => {
	const { text, chatId } = req.body;

	if (!text || !chatId) {
		console.log('Text or ChatId param not sent with request');
		return res.sendStatus(400);
	}

	var newMessage = {
		sender: req.user._id,
		text,
		chat: chatId,
	};

	try {
		var message = await Message.create(newMessage);
		message = await message.populate('sender', 'name avatar email');
		message = await message.populate('chat');
		message = await User.populate(message, {
			path: 'chat.users',
			select: 'name avatar email',
		});

		await Chat.findByIdAndUpdate(req.body.chatId, {
			latestMessage: message,
		});

		res.status(201).json(message);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//@description Fetch all messages of chat
//@route GET /api/messages/:chatId
//@access Protected
const getMessages = asyncHandler(async (req, res) => {
	try {
		const messages = await Message.find({ chat: req.params.chatId })
			.populate('sender', 'name avatar email')
			.populate('chat');
		res.status(200).json(messages);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = { sendMessage, getMessages };
