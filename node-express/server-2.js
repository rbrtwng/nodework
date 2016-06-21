var express = require('express'),
   morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'))
   .use(express.static(__dirname + '/public'))
   .listen(port, hostname, function(){
     console.log(`Server running at http://${hostname}:${port}`);
   });
