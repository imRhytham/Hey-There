const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(
			`MongoDB Connected: ${connect.connection.host}`.cyan.underline.bold
		);
	} catch (error) {
		console.log(`Error: ${error.message}`.red);
		process.exit(1);
	}
};

module.exports = connectDB;
