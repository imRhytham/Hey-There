const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
	sendMessage,
	getMessages,
} = require('../controllers/messageController');

const router = express.Router();

// @route   Post api/messages
// @desc    Send Message
// @access  PROTECTED
router.post('/', protect, sendMessage);

// @route   GET api/messages/:chatId
// @desc    Get all messages
// @access  PROTECTED
router.get('/:chatId', protect, getMessages);

module.exports = router;
