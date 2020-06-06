var pg = require('pg')
var express = require('express')
var router = express.Router()
const pool = new pg.Pool({
  connectionString:
    'postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg'
}) //skoro itak byl na masterze


router.get('/rodzaj/', async (req, res, next) => {
  let response =
    req.query.email != null
      ? await pool.query('select rodzaj,count(rodzaj) from palenie WHERE email = $1 group by rodzaj order by count(rodzaj) desc limit 1 ', [
        req.query.email
      ])
      : await pool.query('select rodzaj,count(rodzaj) from palenie group by rodzaj order by count(rodzaj) desc limit 1').catch()
  res.json(response.rows)
})

router.get('/type/stats', async (req, res, next) =>{
  let response =
  req.query.email != null
    ? await pool.query('select rodzaj,count(rodzaj) from palenie WHERE email = $1 group by rodzaj order by count(rodzaj) ', [
      req.query.email
    ])
    : await pool.query('select rodzaj,count(rodzaj) from palenie group by rodzaj order by count(rodzaj)').catch()
  res.json(response.rows)
})

router.get('/costs', async (req,res,next)=>{
  let days = req.query.days != null ? req.query.days : '1000'
  let response =
    req.query.email != null
      ? await pool.query(

        "SELECT dzien, SUM(ilosc*cena_za_sztuke) FROM palenie WHERE email = $1 and dzien > current_date - $2*(interval '1 day') GROUP BY dzien ",
        [req.query.email, days]
      )
      : await pool.query(
        "SELECT dzien, SUM(ilosc*cena_za_sztuke) FROM palenie WHERE dzien > current_date - $1*(interval '1 day') GROUP BY dzien ",
        [days]
      )
  res.json(response.rows)
})


router.get('/', async (req, res, next) => {
  let response =
    req.query.email != null
      ? await pool.query('SELECT * FROM palenie WHERE email = $1', [
        req.query.email
      ])

      : await pool.query('SELECT * FROM palenie').catch()
  res.json(response.rows)
})
//returns sum of money spend on smoke form all or specific user from last 1000/or specied days;
//optional parameters days,email
//example query : http://localhost:8000/smoke/sum?email=kain@gmail.com&days=1000
router.get('/sum/', async (req, res, next) => {
  let days = req.query.days != null ? req.query.days : '1000'
  let response =
    req.query.email != null
      ? await pool.query(

        "SELECT email,SUM(ilosc*cena_za_sztuke) FROM palenie WHERE email = $1 and dzien > current_date - $2*(interval '1 day') group by email",
        [req.query.email, days]
      )
      : await pool.query(
        "SELECT email,SUM(ilosc*cena_za_sztuke) FROM palenie WHERE dzien > current_date - $1*(interval '1 day') group by email",
        [days]
      )
  res.json(response.rows)
})



router.post('/add', async (req, res, next) => {
  if (!req.body)
    res.json({
      error: true,
      message: 'body is empty'
    })
  else {
    try {
      const result = await pool.query(

        'INSERT INTO palenie(email,dzien,ilosc,cena_za_sztuke,rodzaj) VALUES($1, $2::date, $3, $4, $5)',
        [
          req.body.email,
          req.body.day,
          req.body.count,
          req.body.price,
          req.body.type
        ]
      )
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