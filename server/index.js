const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatsRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');
const colors = require('colors');
const { notFound, errorHandler } = require('./middleware/errorHandler');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.get('/', (req, res) => {
	res.send('Hey There!');
});

app.use('/api/user', userRoutes);
app.use('/api/chats', chatsRoutes);
app.use('/api/messages', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}`.yellow.bold);
});

const io = require('socket.io')(server, {
	pingTimeout: 60000,
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', (socket) => {
	console.log('connected to socket.io');

	socket.on('setup', (userData) => {
		socket.join(userData._id);
		socket.emit('connected');
	});

	socket.on('join room', (room) => {
		socket.join(room);
		console.log('joined room', room);
	});

	socket.on('new message', (newMessageReceived) => {
		var chat = newMessageReceived.chat;
		if (!chat.users) return console.log('Chat.users not defined');

		chat.users.forEach((user) => {
			if (user._id == newMessageReceived.sender._id) return;
			socket.in(user._id).emit('message received', newMessageReceived);
		});
	});

	socket.off('setup', () => {
		console.log('disconnected from socket.io');
		socket.leave(userData._id);
	});
});
