var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var foodRouter = require('./routes/food');
var recipeRouter = require('./routes/recipe');
var portionRouter = require('./routes/portion');
var mealRouter = require('./routes/meal')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

let UserController = require('./user/UserController');
app.use('/auth', UserController);

let AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);

app.use('/food', foodRouter);

app.use('/recipe', recipeRouter);

app.use('/portion', portionRouter);

app.use('/meal', mealRouter);

module.exports = app;
