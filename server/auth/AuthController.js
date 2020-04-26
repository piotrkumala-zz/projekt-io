const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User = require('../user/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const VerifyToken = require('./VerifyToken');

router.post('/register', function(req, res){
	let hashedPassword = bcrypt.hashSync(req.body.password, 8);
	
	User.create({
		name : req.body.name,
		email : req.body.email,
		password : hashedPassword
	},
	function (err, user){
		if (err) return res.status(500).send("Nie udało się zarejestrować.")
		let token = jwt.sign({ id: user._id }, config.secret, {
			expiresIn: 86400
		});
	res.status(200).send({ auth:true, token: token});
	});
});

router.get('/me', VerifyToken, function(req, res, next) {
	let token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'Brak tokenu.' });

	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Nie udało się uwierzytelnić tokenu.' });
		
		User.findById(decoded.id,
		{ password: 0 },
		function (err, user){
			if (err) return res.status(500).send("Podczas wyszukiwania użytkownika wystąpił problem.");
			if (!user) return res.status(404).send("Nie znaleziono użytkownika.");
			
			//res.status(200).send(user);
			next(user);
		});
	});
});

router.use(function (user, req, res, next) {
	res.status(200).send(user);
});

router.post('/login', function(req, res) {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) return res.status(500).send("Błąd serwera.");
		if (!user) return res.status(404).send("Nie znaleziono użytkownika.");
		
		let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
		
		let token = jwt.sign({ id: user._id}, config.secret, {
			expiresIn: 86400
		});
		
		res.status(200).send({ auth: true, token: token });
	});
});

router.get('/logout', function(req, res) {
	res.status(200).send({ auth: false, token: null });
});

module.exports = router;