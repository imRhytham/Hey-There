const express = require('express');
const {
	registerUser,
	loginUser,
	searchUser,
	editUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/', protect, searchUser);
router.put('/edit-user', editUser);

module.exports = router;
