var jwt = require('jsonwebtoken');
var db = require('../db');

const Auth = {
	async verifyToken(req, res, next) {
		const token = req.headers['x-access-token'];
		if(!token){
			return res.status(400).send({'message': 'Brak tokenu'});
		}
		try{
			const decoded = await jwt.verify(token, process.env.SECRET);
			const text = 'SELECT * FROM USERS WHERE email = $1';
			const { rows } = await db.query(text, [decoded.userEmail]);
			if(!rows[0]){
				return res.status(400).send({ 'message': 'Nieprawidłowy token' });
			}
			req.user = { email: decoded.userEmail };
			next();
		}
		catch(error){
			return res.status(400).send(error);
		}
	}
}

module.exports = Auth;