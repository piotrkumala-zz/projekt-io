var pg = require('pg')
var express = require('express');
var router = express.Router();
const conString = process.env.ELEPHANTSQL_URL || "postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg";
const client = new pg.Client(conString)

client.connect(function(err) {
	if(err) {
		return console.error("could not connect to database", err);
	}
	client.query("SELECT * FROM persons", function(err, result){
		if(err) {
			return console.error('query error', err);
		}
		person = result.rows[0];
		console.log(person);
		client.end();
	});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(person)
});

module.exports = router;
