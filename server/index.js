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
app.listen(port, () => {
	console.log(`Server listening on port ${port}`.yellow.bold);
});
