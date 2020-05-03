var pg = require('pg')
var express = require('express');
var router = express.Router();
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString)

client.connect(function(err) {
	if(err) {
		return console.error("could not connect to database", err);
	}
	client.query("ALTER TABLE klient ADD CONSTRAINT email_unique UNIQUE(email)", function(err, result){
		if(err) {
			return console.error('query error', err);
		}
		client.end();
	});
});

router.get('/', function(req, res, next) {
  res.send('a');
});

module.exports = router;
