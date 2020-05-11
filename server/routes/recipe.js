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
    let response= req.query.id != null ? await pool.query('SELECT * FROM przepis WHERE porcja_id = $1', [req.query.id]) : await pool.query('SELECT * FROM przepis')
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
            const result = await pool.query('DELETE FROM Przepis WHERE porcja_id = $1', [req.body.id])
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
            const result = await pool.query('INSERT INTO Przepis(nazwa, pora_dnia, opis, porcja_id, z_bazy) VALUES($1, $2, $3, $4, $5)',
            [req.body.name, req.body.dayTime, req.body.description, req.body.id, 'f']);
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
            const result = await pool.query('UPDATE Przepis SET nazwa = $1, pora_dnia = $2, opis = $3, porcja_id = $4, z_bazy = $5 WHERE porcja_id=$4',
            [req.body.name, req.body.dayTime, req.body.description, req.body.id, 'f']);
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