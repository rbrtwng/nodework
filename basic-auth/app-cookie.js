var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(logger('dev'));

app.use(cookieParser('12345-67890-09876-54321'));
//auth funciton

function auth(req, res, next){
  console.log(req.headers);

  if(!req.signedCookies.user){
    console.log('Point0');
    var authHeader = req.headers.authorization;
    if(!authHeader){
    //  console.log('Point0');
      var err = new Error('You are not authenticated');
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password1'){
      res.cookie('user','admin',{signed: true});
      next();
    }else{
      var err = new Error('You are not authenticated');
      err.status = 401;
      next(err);
    }
  }else{
    if (req.signedCookies.user != 'admin'){
      var err = new Error('You are not authenticated');
      err.status = 401;
      next(err);
    }else {
      next();
    }
  }

}

app.use(auth);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next){
  //console.log('Point1');
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
