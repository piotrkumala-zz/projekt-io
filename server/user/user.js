var db = require('../db');
var pg = require('pg');
const conString = process.env.ELEPHANTSQL_URL || "postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg";
const pool = new pg.Pool({
    user: 'nviwmkcg',
    host: 'drona.db.elephantsql.com',
    database:'nviwmkcg',
    password: '4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww',
    port: 5432,
    ssl: true
})
var Helper = require('./helper');

const User = {
	async create(req, res) {
		console.log(req.body);
	//	console.log(!req.body.email, !req.body.password, !req.body.firstName ,!req.body.lastName , !req.body.height ,!req.body.gender);
	//	console.log(req.body.email, req.body.password, req.body.firstName ,req.body.lastName , req.body.height ,req.body.gender);
		
		if(!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.height || !req.body.gender) {
			return res.status(400).send({'message': 'Wszystkie pola muszą być wypełnione'});
		}

		if(!Helper.validateEmail(req.body.email)){
			return res.status(400).send({ 'message': 'Nieprawidłowy format adresu email' });
		}

		const hashPassword = Helper.hashPassword(req.body.password);
		
		const createQuery = `INSERT INTO klient(email, haslo, imie, nazwisko, wzrost, plec)
			VALUES ($1, $2, $3, $4, $5, $6)
			returning *`;
			const values = [
				req.body.email,
				hashPassword,
				req.body.firstName,
				req.body.lastName,
				req.body.height,
				req.body.gender
			];
		try{
			const { rows } = await pool.query(createQuery, values);
			const token = Helper.generateToken(rows[0].email);
			return res.status(201).send({ token });
		} 
		catch(error) {
			if(error.routine === '_bt_check_unique'){
				return res.status(400).send({ 'message': 'Użytkownik o takim mailu już istnieje.' })	
			}
			return res.status(400).send(error);
		}
	},
	
	async login(req, res){
		if(!req.body.email){
			return res.status(400).send({'message': 'Nie podano maila'});
		}
		if(!req.body.password){
			return res.status(400).send({'message': 'Nie podano hasła'});
		}
		if(!Helper.validateEmail(req.body.email)){
			return res.status(400).send({ 'message': 'Nieprawidłowy format adresu email' });
		}
		const text = 'SELECT * FROM klient WHERE email = $1';
		try{
			const { rows } = await pool.query(text, [req.body.email]);
			if(!rows[0]){
				return res.status(400).send({'message': 'Nie ma takiego użytkownika'});
			}
			if(!Helper.comparePassword(rows[0].haslo, req.body.password)) {
				return res.status(400).send({ 'message': 'Nieprawidłowe hasło' });
			}
			console.log("generate token");
			const token = Helper.generateToken(rows[0].email);
			console.log(token);
			return res.status(200).send({ token });
		}
		catch(error){
			return res.status(400).send(error);
		}
	},
	
	async delete(req,res){
		const deleteQuery = 'DELETE FROM klient WHERE email=$1 returning *';
		try{
			const { rows } = await pool.query(deleteQuery, [req.user.email]);
			if(!rows[0]){
				return res.status(404).send({'message': 'Nie znaleziono użytkownika'});
			}
			return res.status(204).send({ 'message': 'Usunięto' });
		}
		catch(error){
			return res.status(400).send(error);
		}
	}
}

module.exports = User;