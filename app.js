var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
var indexRouter = require('./routes/index');
var usersAdminRouter = require('./routes/users-admin');
var studentRouter = require('./routes/student-admin');
var foodCouponsRouter = require('./routes/food-coupons-admin');
var jobPostRouter = require('./routes/job-post-admin');
var categoryRouter = require('./routes/category-admin');
var accomodationAdminRouter = require('./routes/accomodation-admin');
var jobCategoryRouter = require('./routes/jobCategory-admin');
// Import Routes/*==========FRONT==============*/ 
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var authRouter = require('./routes/auth');
var orderRouter = require('./routes/order');
var accomodationRouter = require('./routes/accomodation');
var jobRouter = require('./routes/job');
var vendorRouter = require('./routes/vendor');
var imagesRouter = require('./routes/images');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/api/users-admin', usersAdminRouter);
app.use('/api/student-admin', studentRouter);
app.use('/api/food-coupons-admin', foodCouponsRouter);
app.use('/api/job-post-admin', jobPostRouter);
app.use('/api/category-admin', categoryRouter);
app.use('/api/accomodation-admin', accomodationAdminRouter);
app.use('/api/job-category-admin', jobCategoryRouter);
/*==========FRONT==============*/ 
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/accomodation', accomodationRouter);
app.use('/api/job', jobRouter);
app.use('/api/vendor', vendorRouter);
app.use('/api/images', imagesRouter);
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
