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

  newDish.save(function(err,dish){
    if(err){
      throw err;
    }

    console.log('Dish created');
    console.log(dish);
    var id = dish._id;

    setTimeout(function(){
      Dishes.findByIdAndUpdate(id, {$set: {
        description: 'Updated Test'
      }}, {
        new: true
      })
      .exec(function(err, dish){
        if(err){
          throw err;
        }

        console.log('Updated Dish');
        console.log(dish);

        db.collection('dishes').drop(function(){
          db.close();
        });
      });
    }, 3000);
  });
});
