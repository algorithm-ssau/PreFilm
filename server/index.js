const express = require("express");
const mongoose = require("mongoose");
const config = require("../env.json");

const corsMiddleware = require('./middleware/cors.middleware')
const adminRouter = require('./routes/admin.routes');

const app = express();
const PORT = config.backend.serverPort;

app.use(express.json());
app.use(corsMiddleware);

app.use('/api/admin', adminRouter);

const start = async () => {
	try {
		await mongoose.connect(config.backend.dbURL);

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		})
	} catch (e) {
		console.log(e);
	}
};

start();