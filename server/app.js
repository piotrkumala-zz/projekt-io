var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dietRouter = require("./routes/diet")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let UserController = require('./user/UserController');
app.use('/auth', UserController);

let AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);

app.use('/diet', dietRouter)

module.exports = app;
