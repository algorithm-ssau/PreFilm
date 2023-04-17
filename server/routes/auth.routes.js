const Router = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../env.json");

const File = require("../models/Film");
const User = require("../models/User");

const router = new Router();

router.post('/login', async (req, res) => {
	try {
		const { login, password } = req.body;
		const user = await User.findOne({ login });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const isPassValid = bcrypt.compareSync(password, user.password);
		if (!isPassValid) {
			return res.status(400).json({ message: "Invalid password" });
		}
		const token = jwt.sign({}, config.backend.secretKey, { expiresIn: "1h" });
		return res.status(200).json({token, userLogin: user.login});
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Server error" });
	}
});