const express = require('express');

const { protect } = require('./../middleware/authMiddleware');
const {
	accessChat,
	getChats,
	createGroupChat,
	editGroupInfo,
	deleteChat,
	addUsersToGroup,
	removeUsersFromGroup,
} = require('./../controllers/chatController');

const router = express.Router();

router.post('/', protect, accessChat);
router.get('/', protect, getChats);
router.post('/group', protect, createGroupChat);
router.put('/group', protect, editGroupInfo);
router.delete('/', protect, deleteChat);
router.put('/group/add', protect, addUsersToGroup);
router.put('/group/remove', protect, removeUsersFromGroup);

module.exports = router;
