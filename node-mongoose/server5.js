var mongoose = require('mongoose');
var assert = require('assert');
var Leadership = require('./models/Leadership');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("connected correctly to db");

  Leadership.create({
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, . . ."
}, function(err, leader){
    if(err){
      throw err;
    }

    console.log('leader created');
    console.log(leader);
    var id = leader._id;

    setTimeout(function(){
      Leadership.findByIdAndUpdate(id, {$set: {
        description: 'Updated leader Test',
        abbr: 'CFO'
      }}, {
        new: true
      })
      .exec(function(err, leader){
        if(err){
          throw err;
        }

        console.log('Updated leader');
        console.log(leader);

          db.collection('leaders').drop(function(){
            db.close();
          });

      });
    }, 3000);
  });

});
