const express = require("express");
const mongoose = require("mongoose");
const config = require("../env.json");

const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = config.backend.serverPort;

const corsMiddleware=require('./middleware/corse.middleware');

app.use(corsMiddleware);

app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
	try {
		await mongoose.connect(config.backend.dbURL);

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		})
	} catch (e) {

	}
};

start();