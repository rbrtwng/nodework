/*!
 * server
 * Copyright(c) 2016 Man Wang
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var morgan = require('morgan');
var dishRouter = require('./dishRouter');
var leaderRouter = require('./leaderRouter');
var promoRouter = require('./promoRouter');


/**
 * server implementation
 */

var hostname = 'localhost';
var port = 3000;
var app = express();
app.use(morgan('dev'))
   .use('/dishes',dishRouter)
   .use('/leadership',leaderRouter)
   .use('/promotions',promoRouter)
   .listen(port, hostname, function(){
     console.log(`Server running at http://${hostname}:${port}/`);
   });
