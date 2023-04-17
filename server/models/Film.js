const { Schema, model } = require("mongoose");

const File = new Schema({
	name: { type: String, required: true },
	year: { type: Number },
	description: { type: String },
	rating: { type: Number },
	poster: { type: String }
});

module.exports = model('File', File);