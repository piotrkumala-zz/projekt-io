var pg = require('pg')
var express = require('express')
var router = express.Router()
const pool = new pg.Pool({
    connectionString:
        'postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg'
}) //skoro itak byl na masterze

router.get('/', async (req, res, next) => {
    console.log(req.query)

    let response =
        req.query.email != null
            ? await pool.query('SELECT * FROM notatnik WHERE email = $1', [
                req.query.email
            ])
            : await pool.query('SELECT * FROM notatnik').catch()
    if(response.rows)
        res.json(response.rows)
    else
    {
        res.json([{
            name: req.query.email
        }])
    }
})

router.post('/add', async (req, res, next) => {
    if (req.body.type == null) {
        req.body.type = 'p'
    }

    if (!req.body)
        res.json({
            error: true,
            message: 'body is empty'
        })
    else {
        try {
            const result = await pool
                .query(
                    'INSERT INTO notatnik(email,rodzaj,nr_notatki,tekst) VALUES($1, $2, $3, $4)',
                    [req.body.email, req.body.type, req.body.nr, req.body.text]
                )
                .catch()
            res.json({
                error: false,
                message: result.rowCount + ' rows affected'
            })
        } catch (e) {
            res.json({
                error: true,
                message: e
            })
        }
    }
})

module.exports = router
