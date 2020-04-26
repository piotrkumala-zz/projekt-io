const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
	let token = req.headers['x-access-token'];
	if (!token) return res.status(403).send({ auth: false, message: "Brak tokenu." });
	
	jwt.verify(token, config.secret, function(err, decoded){
		if (err) return res.status(500).send({ auth: false, message: "Nie udało się uwierzytelnić tokenu." });
		
		req.userId = decoded.id;
		next();
	});
}

module.exports = verifyToken;