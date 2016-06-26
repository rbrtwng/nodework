var mongoose = require('mongoose');
var assert = require('assert');
var Dishes = require('./models/dish1');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("connected correctly to db");

  //create a new dishes
  var newDish = Dishes({
    name: 'Uthapizza',
    description: 'Test'
  });

  newDish.save(function(err){
    if(err){
      throw err;
    }
    console.log('Dish created');

    //find all dishes

    Dishes.find({}, function(err, dishes){
      if(err){
        throw err;
      }
      console.log(dishes);

      db.collection('dishes').drop(function(){
        db.close();
      });
    });
  });
});
