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


router.get('/',async (req,res,next) =>{
    let response= req.query.id != null ? await pool.query('SELECT * FROM porcja WHERE porcja_id = $1', [req.query.id]) : await pool.query('SELECT * FROM porcja')
    res.json(response.rows);
})



module.exports = router;