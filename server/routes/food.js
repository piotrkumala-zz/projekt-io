var pg = require('pg')
var express = require('express');
var router = express.Router();
const conString = process.env.ELEPHANTSQL_URL || "postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg";
const pool = new pg.Pool({
    connectionString:conString
})


router.get('/',async (req,res,next) =>{
    let response= req.query.name != null ? await pool.query('SELECT * FROM jedzenie WHERE nazwa = $1 SORT BY nazwa', [req.query.name]) : await pool.query('SELECT * FROM jedzenie')
    res.json(response.rows);
})

router.post('/add', async (req, res, next)=>{
    if(Object.values(req.body).every(x => x == null))
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
                message: e.detail
            })
        }
    }
})

module.exports = router;
