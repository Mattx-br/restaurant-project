var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// for redis database
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

// var connectRedis = require('connect-redis')
// var RedisStore = connectRedis(session);

// for formidable module
var formidable = require('formidable');

// middleware for formidable

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();


app.use(function(req, res, next) {

    // console.log('url da pagina', req.url);
    // console.log('método da pagina', req.method);

    if (req.method === 'POST' && req.url == '/admin/menus') {
        var form = formidable.IncomingForm({
            uploadDir: path.join(__dirname, '/public/images'),
            keepExtensions: true
        });

        form.parse(req, function(err, fields, files) {


            // this thing is on the class 28 as well
            // req.body = fields;

            req.fields = fields;
            req.files = files;

            next();

        });
    } else { next(); }

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    store: new RedisStore({
        host: "localhost",
        port: 6379
    }),
    secret: 'Cle@r2022',
    resave: true,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());

// THIS IS THE THING THAT DOES NOT LET ME LOGIN, AND THE TEACHER ONLY SAID THTAT ON CLASS 28, BUT I GOT THIS PROBLEM AT CLASS 24, I SPENT A WHOLE DAY TRYING TO FIX THAT DAMN BUG, AND I ONLY GOT FIXED AT HOME, BUT IN OFFICE I DIDNT GET, LETS SE IF COMMENTING THIS LINE IT WILL WORK AT THE OFFICE

// DO NOT COMMENT THIS AT HOME, ONLY AT THE OFFICE
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;