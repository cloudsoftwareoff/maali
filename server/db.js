const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect(process.env.DB, connectionParams);
		mongoose.connection.useDb('cloudsoftware');
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};

// const clientOptions = {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// };

// const client = new MongoClient(process.env.DB, clientOptions);

// const connectToDatabase = async () => {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB successfully');
//     return client.db('cloudsoftware');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// };

// const closeConnection = () => {
//   client.close();
//   console.log('MongoDB connection closed');
// };

// module.exports = { connectToDatabase, closeConnection };