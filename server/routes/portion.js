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
router.post('/delete', async (req, res, next)=>{
    if(!req.body.id || !req.body.name)
        res.json( {
            error: true,
            message: 'no id or name specified'
        });
    else{
        try{
            const result = await pool.query('DELETE FROM porcja WHERE porcja_id = $1 AND nazwa = $2', [req.body.id, req.body.name])
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
            const result = await pool.query('INSERT INTO porcja(porcja_id, nazwa, ilość, z_bazy, rodzaj) VALUES($1, $2, $3, $4, $5)',
            [req.body.id, req.body.name, req.body.quantity, 'f', req.body.type]);
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

router.post('/update', async (req, res, next)=>{
    if(Object.values(req.body).every(x => x == null))
        res.json({
            error: true,
            message: 'body is empty'
        });
    else{
        try{
            const result = await pool.query('UPDATE porcja SET porcja_id = $1,nazwa = $2,ilość = $3,z_bazy =$4,rodzaj =$5 WHERE porcja_id = $1 AND nazwa = $2',
            [req.body.id, req.body.name, req.body.quantity, 'f', req.body.type]);
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