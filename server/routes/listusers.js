var pg = require('pg')
var express = require('express');
var router = express.Router();
const conString = process.env.ELEPHANTSQL_URL || "postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg";
const pool = new pg.Pool({
    user: 'nviwmkcg',
    host: 'drona.db.elephantsql.com',
    database:'nviwmkcg',
    password: '4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww',
    port: 5432,
    ssl: true
})

pool.query("SELECT * FROM klient", function(err, result){
	if(err) {
		return console.error('query error', err);
	}
	person = result.rows;
	console.log(person);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(person)
});

module.exports = router;
