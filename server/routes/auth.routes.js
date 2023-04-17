const Router = require("express");
const jwt = require("jsonwebtoken");
const config = require("../../env.json");

const router = new Router();

router.post('/login', async (req, res) => {
	try {
		const { password } = req.body;
		const isPassValid = password === config.backend.adminPassword;
		if (!isPassValid) {
			return res.status(400).json({ message: "Invalid password" });
		}
		const token = jwt.sign({}, config.backend.secretKey, { expiresIn: "1h" });
		return res.status(200).json({ token });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;