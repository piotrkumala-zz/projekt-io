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
    let response= req.query.id != null ? await pool.query('SELECT * FROM posiłek WHERE porcja_id = $1', [req.query.id]) : await pool.query('SELECT * FROM posiłek')
    res.json(response.rows);
})

router.post('/delete', async (req, res, next)=>{
    if(!req.body.id)
        res.json( {
            error: true,
            message: 'no id specified'
        });
    else{
        try{
            const result = await pool.query('DELETE FROM posiłek WHERE porcja_id = $1', [req.body.id])
            res.json({
                error: false,
                message: result.rowCount + ' rows affected'
            })
        }
        catch (e){
            res.json({
                error: true,
                message: e.detail
            })
        }
    }
})

router.post('/add', async (req, res, next) =>{
    if(Object.values(req.body).every(x => x == null))
        res.json({
            error: true,
            message: 'body is empty'
        });
    else{
        try{
            const result = await pool.query('INSERT INTO posiłek(email, dzien, pora_dnia, porcja_id) VALUES($1, $2, $3, $4)',
            [req.body.email, req.body.day, req.body.dayTime, req.body.id]);
            res.json({
                error: false,
                message: result.rowCount + ' rows affected'
            })
        }
        catch (e){
            res.json({
                error: true,
                message: e
            })
        }
    }
})

router.post('/update', async (req, res, next)=>{
    if(Object.values(req.body).every(x => x == null))
        res.json({
            error: true,
            message: 'body is empty'
        });
    else{
        try{
            const result = await pool.query('UPDATE posiłek SET email = $1, dzien = $2, pora_dnia = $3, porcja_id = $4 WHERE porcja_id =$4',
            [req.body.email, req.body.day, req.body.dayTime, req.body.id]);
            res.json({
                error: false,
                message: result.rowCount + ' rows affected'
            })
        }
        catch (e){
            res.json({
                error: true,
                message: e.detail
            })
        }
    }
})
module.exports = router;