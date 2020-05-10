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
    console.log(req.query.name)
    let response= req.query.name != null ? await pool.query('SELECT * FROM jedzenie WHERE nazwa = $1', [req.query.name]) : await pool.query('SELECT * FROM jedzenie')
    res.json(response.rows);
})

router.post('/delete', async (req, res, next)=>{
    console.log(req.body)
    if(!req.body.name)
        res.json( {
            error: true,
            message: 'no name specified'
        });
    else{
        try{
            const result = await pool.query('DELETE FROM jedzenie WHERE nazwa = $1', [req.body.name])
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

router.post('/add', async (req, res, next)=>{
    if(!req.body)
        res.json({
            error: true,
            message: 'body is empty'
        });
    else{
        try{
            const result = await pool.query('INSERT INTO Jedzenie(nazwa,policzalne,kalorie,tluszcz,białko,cukry,z_bazy) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [req.body.name, req.body.countable, req.body.calories, req.body.fat, req.body.protein, req.body.sugar, 'f']);
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
    if(!req.body)
        res.json({
            error: true,
            message: 'body is empty'
        });
    else{
        try{
            const result = await pool.query('UPDATE Jedzenie SET nazwa = $1,policzalne = $2,kalorie = $3,tluszcz =$4,białko =$5,cukry =$6 WHERE nazwa = $1',
            [req.body.name, req.body.countable, req.body.calories, req.body.fat, req.body.protein, req.body.sugar]);
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
module.exports = router;