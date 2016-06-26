var mongoose = require('mongoose');
var assert = require('assert');
var Dishes = require('./models/dish');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("connected correctly to db");

  Dishes.create({
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "price": "4.99",
      "description": "A unique . . .",
      "comments": [
        {
          "rating": 5,
          "comment": "Imagine all the eatables, living in conFusion!",
          "author": "John Lemon"
        },
        {
          "rating": 4,
          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          "author": "Paul McVites"
        }
      ]
}, function(err, dish){
    if(err){
      throw err;
    }

    console.log('Dish created');
    console.log(dish);
    var id = dish._id;

    setTimeout(function(){
      Dishes.findByIdAndUpdate(id, {$set: {
        description: 'Updated Test',
        label: 'Hot'
      }}, {
        new: true
      })
      .exec(function(err, dish){
        if(err){
          throw err;
        }

        console.log('Updated Dish');
        console.log(dish);
        dish.comments.push({
          rating: 1,
          comment: 'This is a terrible one',
          author: 'Bob'
        });

        dish.save(function(err, dish){
          if (err) throw err;
          console.log('Comment added');
          console.log(dish);
          db.collection('dishes').drop(function(){
            db.close();
          });
        });
      });
    }, 3000);
  });

});
