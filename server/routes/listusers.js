var pg = require('pg')
var express = require('express');
var router = express.Router();
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString)

client.connect(function(err) {
	if(err) {
		return console.error("could not connect to database", err);
	}
	client.query("SELECT * FROM klient", function(err, result){
		if(err) {
			return console.error('query error', err);
		}
		person = result.rows;
		console.log(person);
		client.end();
	});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(person)
});

module.exports = router;
