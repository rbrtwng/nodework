
/*!
 * favoriteRouter
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
var Favorites = require('../models/favorites');
var Verify = require('./verify');

/**
 * dishRouter implementation
 */
var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){

        Favorites.find({})
          .populate('postedBy')
          .populate('dishes')
          .exec(function (err, fav){
          if (err){
            throw err;
          }
          res.json(fav);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
      Favorites.findOne({postedBy: req.decoded._doc._id}, function(err, favorite){
        var updateFavorite = function(favorite){
          if(favorite.dishes.indexOf(req.body._id) == -1){
            favorite.dishes.push(req.body._id);
          }
            favorite.save(function(err, favorite){
              if(err) throw err;
              res.json(favorite);
            });
        }
        if(err)  throw err;

          if (favorite !== null){
            updateFavorite(favorite);
          }else{
            Favorites.create({postedBy: req.decoded._doc._id}, function(err, favorite){
              if(err){
                console.log(err);
              }
              updateFavorite(favorite);
            })
          }
      });

})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
      Favorites.remove({postedBy: req.decoded._doc._id}, function(err, resp){
        if (err) throw err;
        res.json(resp);
      });
});

favoriteRouter.route('/:dishObjectId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
        Favorites.findOne({postedBy: req.decoded._doc._id}, function(err, favorite){
          if(err)  throw err;
          if(favorite !== null){
            favorite.dishes.splice(favorite.dishes.indexOf(req.params.dishObjectId),1);
            favorite.save(function(err, favorite){
              if(err) throw err;
              res.json(favorite);
            });
          }
        })
});





/**
 * Expose `favoriteRouter`.
 */
module.exports = favoriteRouter;
