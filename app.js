var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var simpleProgressRouter = require('./routes/simple-progress');
var simpleProgressWithFocusManagementRouter = require('./routes/simple-progress-with-focus-management');
var simpleProgressWithLiveRegionRouter = require('./routes/simple-progress-with-live-region');
var simpleProgressWithRealtimeUpdatesRouter = require('./routes/simple-progress-with-realtime-updates');
var multipleProgressWithUpdatesRouter = require('./routes/multiple-progress-with-updates');
var multipleProgressWithTooMuchInformationRouter = require('./routes/multiple-progress-with-too-much-information');
var multipleProgressWithFocusManagementRouter = require('./routes/multiple-progress-with-focus-management');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/simple-progress', simpleProgressRouter);
app.use('/simple-progress-with-focus-management', simpleProgressWithFocusManagementRouter);
app.use('/simple-progress-with-live-region', simpleProgressWithLiveRegionRouter);
app.use('/simple-progress-with-realtime-updates', simpleProgressWithRealtimeUpdatesRouter);
app.use('/multiple-progress-with-updates', multipleProgressWithUpdatesRouter);
app.use('/multiple-progress-with-too-much-information', multipleProgressWithTooMuchInformationRouter);
app.use('/multiple-progress-with-focus-management', multipleProgressWithFocusManagementRouter);

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
