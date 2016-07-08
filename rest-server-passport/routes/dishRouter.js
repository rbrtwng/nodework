
/*!
 * dishRouter
 * Copyright(c) 2016 Man Wang
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes');
var Verify = require('./verify');

/**
 * dishRouter implementation
 */
var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
        //res.end('Will send all the dishes to you!');
        //Dishes.find({}, function(err, dish){
        Dishes.find({})
          .populate('comments.postedBy')
          .exec(function (err, dish){
          if (err){
            throw err;
          }
          res.json(dish);
        });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    Dishes.create(req.body, function(err, dish){
      if (err) throw err;

      console.log('Dish created!');
      var id = dish._id;
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the dish with id ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
      //  res.end('Deleting all dishes');
      Dishes.remove({}, function(err, resp){
        if (err) throw err;
        res.json(resp);
      });
});

dishRouter.route('/:id')

.get(function(req,res,next){
        //res.end('Will send details of the dish: ' + req.params.id +' to you!');
        Dishes.findById(req.params.id)
          .populate('comments.postedBy')
          .exec(function(err, dish){
          if (err) throw err;
          res.json(dish);
        });
})

.put(function(req, res, next){
        //res.write('Updating the dish: ' + req.params.id + '\n');
  //  res.end('Will update the dish: ' + req.body.name +
    //        ' with details: ' + req.body.description);

    Dishes.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    }, function(err, dish){
      if (err) throw err;
      res.json(dish);
    });
})

.delete(function(req, res, next){
        //res.end('Deleting dish: ' + req.params.id);
     Dishes.findByIdAndRemove(req.params.id, function(err, resp){
       if (err) throw err;
       res.json(resp);
     });
});

dishRouter.route('/:id/comments')

.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
  Dishes.findById(req.params.id)
  .populate('comments.postedBy')
  .exec(function(err, dish){
    if (err) throw err;
    res.json(dish.comments);
  });
})

.post(function(req, res, next){
  Dishes.findById(req.params.id, function(err, dish){
    if (err) throw err;
    req.body.postedBy = req.decoded._doc._id;
    dish.comments.push(req.body);
    dish.save(function(err, dish){
      if (err) throw err;
      console.log('Updated Comments');
      res.json(dish);
    });

  });
})

.delete(Verify.verifyAdmin, function(req, res, next){
  Dishes.findById(req.params.id, function(err, dish){
    if (err) throw err;
    for(var i = (dish.comments.length -1); i>=0; i--){
      dish.comments.id(dish.comments[i]._id).remove();
    }
    //dish.comments.push(req.body);
    dish.save(function(err, result){
      if (err) throw err;
      //console.log('Deleted All Comments');
      //res.json(dish);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Deleted all comments!');
    });

  });
});

dishRouter.route('/:id/comments/:commentId')

.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
  Dishes.findById(req.params.id, function(err, dish){
    if (err) throw err;
    res.json(dish.comments.id(req.params.commentId));
  });
})

.put(function(req, res, next){
  Dishes.findById(req.params.id, function(err, dish){
    if (err) throw err;
    //dish.comments.push(req.body);
    dish.comments.id(req.params.commentId).remove();

    req.body.postedBy = req.decoded._doc._id;
    dish.comments.push(req.body);
    dish.save(function(err, dish){
      if (err) throw err;
      console.log('Updated Comments');
      res.json(dish);
    });

  });
})

.delete(function(req, res, next){
  Dishes.findById(req.params.id, function(err, dish){
  //  if (err) throw err;
  if (dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id){
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    return next(err);
  }
    dish.comments.id(req.params.commentId).remove();
    //dish.comments.push(req.body);
    dish.save(function(err, dish){
      if (err) throw err;
      console.log('Updated Comments');
      res.json(dish);
    });

  });
});


/**
 * Expose `dishRouter`.
 */
module.exports = dishRouter;
