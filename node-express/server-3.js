var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'))
   .use(bodyParser.json())
   .all('/dishes',function(req, res, next){
     res.writeHead(200,{'Content-Type':'text/plain'});
     next();
   })
   .get('/dishes', function(req, res, next){
     res.end('Will send all the dishes to you!');
   })
   .get('/dishes/:dishId', function(req, res, next){
     res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
   })
   .post('/dishes', function(req, res, next){
     console.log(req.body);
     res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
   })
   .put('/dishes/:dishId', function(req, res, next){
     res.write('Updting the dish: ' + req.params.dishId + '\n');
     res.end('Will update the dish: ' + req.body.name + ' with the details: ' + req.body.description);
   })
   .delete('/dishes', function(req, res, next){
     res.end('Deleting all dishes');
   })
   .delete('/dishes/:dishId', function(req, res, next){
     res.end('Will delete the dish: ' + req.params.dishId);
   })
   .use(express.static(__dirname + '/public'))
   .listen(port, hostname, function(){
     console.log(`Server running at http://${hostname}:${port}`);
   });
