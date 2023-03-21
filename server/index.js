const express = require("express");
const mongoose = require("mongoose");
const config = require("../env.json");

const app = express();
const PORT = config.backend.serverPort;
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