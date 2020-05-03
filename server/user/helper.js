var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const Helper = {
	hashPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
	},

	comparePassword(hashPassword, password) {
		return bcrypt.compareSync(password, hashPassword);
	},

	validateEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	},

generateToken(email) {
	const token = jwt.sign({
		userEmail: email
	},
		process.env.SECRET, { expiresIn: '7d' }
	);
	return token;
	}
}

module.exports = Helper;