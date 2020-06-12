var pg = require('pg')
var express = require('express');
var router = express.Router();
const Auth = require('../auth/Auth')
const conString = process.env.ELEPHANTSQL_URL || "postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg";
const pool = new pg.Pool({
    connectionString: conString
})
const mealHelper = require('../helpers/mealHelper')


router.get('/week', async (req,res,next) =>{
        try{
            const startDate = mealHelper.getWeekStart();
            const endDate = mealHelper.getWeekEnd(startDate);
            const response = await pool.query(
                'SELECT por.porcja_id, por.nazwa, por.ilość, j.kalorie, p.pora_dnia, p.dzien FROM posiłek p, porcja por, jedzenie j WHERE dzien > $1 AND dzien < $2 AND p.porcja_id = por.porcja_id AND j.nazwa = por.nazwa AND p.email = $3', 
            [startDate, endDate, req.user.email]); 
            res.json(response.rows);
        }
        catch (e){
            console.log(e)
            res.json({
                error: true,
                message: e.detail
            })
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
            console.log('' + req.body.count + ' g')
            const result = await pool.query('INSERT INTO porcja(nazwa, ilość, z_bazy, rodzaj) VALUES ( $1, $2, $3, $4) RETURNING porcja_id',
            [req.body.name, '' + req.body.count + ' g', 't', true]);
            const portion_id = result.rows[0].porcja_id;
            console.log(portion_id)
            console.log(req.body.date)
            console.log(req.body.email)
            const result2 = await pool.query('; INSERT INTO posiłek(email,dzien,pora_dnia, porcja_id) VALUES ( $1, $2, $3, $4)',
            [req.body.email, req.body.date, req.body.dayTime, portion_id])
            res.json({
                error: false,
                message: result.rowCount + ' rows affected' + result2.rowCount + 'rows affected'
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