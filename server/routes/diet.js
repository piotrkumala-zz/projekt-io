var pg = require('pg')
var express = require('express');
var router = express.Router();
const conString = process.env.ELEPHANTSQL_URL || "postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg";
const client = new pg.Client(conString)


router.get('/', (req,res,next) =>{
    res.json("Strona główna diety");
})


module.exports = router;