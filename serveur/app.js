var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
let bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
let sessionRouter = require('./routes/session')
var usersRouter = require('./routes/users');

var app = express();

require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/session', sessionRouter)
app.use('/users', usersRouter);


app.use(function (req, res, next) {
    next(createError(404));
});

module.exports = app;
