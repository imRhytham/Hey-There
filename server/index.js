const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
