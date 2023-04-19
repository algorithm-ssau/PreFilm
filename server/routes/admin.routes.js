const Router = require("express");
const jwt = require("jsonwebtoken");
const config = require("../../env.json");
const adminMiddleware = require("../middleware/admin.middleware");

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

// only on test purposes
router.get('/check', adminMiddleware, async (req, res) => {
	try {
		console.log('token is correct');
		return res.status(200).json({ message: 'token is correct' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;