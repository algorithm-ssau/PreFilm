const jwt = require('jsonwebtoken');
const config = require('../../env.json');

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(400).json({ message: 'Access denied' });
		}
		// it empty now, so this is enough
		try {
			const decoded = jwt.verify(token, config.backend.secretKey);
		} catch (e) {
			// too large output without this block
			console.log("Access denied: wrong token")
			return res.status(400).json({ message: 'Access denied' });
		}
		next();
	} catch (e) {
		console.log(e);
		return res.status(400).json({ message: 'Access denied' });
	};
}