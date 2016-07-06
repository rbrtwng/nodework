
/*!
 * promoRouter
 * Copyright(c) 2016 Man Wang
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var Promotions = require('../models/promotions');
var Verify = require('./verify');



/**
 * promoRouter implementation
 */
var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
/*
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})
*/

.get(Verify.verifyOrdinaryUser, function(req,res,next){
        //res.end('Will send all the promotions to you!');
        Promotions.find({}, function(err, promotion){
          if (err){
            throw err;
          }
          res.json(promotion);
        });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    //res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    Promotions.create(req.body, function(err, promotion){
      if (err) throw err;

      console.log('promotion created!');
      var id = promotion._id;
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the promotion with id ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        //res.end('Deleting all promotions');
        Promotions.remove({}, function(err, resp){
          if (err) throw err;
          res.json(resp);
        });
});

promoRouter.route('/:id')
/*
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})
*/

.get(Verify.verifyOrdinaryUser, function(req,res,next){
        //res.end('Will send details of the promotion: ' + req.params.id +' to you!');
        Promotions.findById(req.params.id, function(err, promotion){
          if (err) throw err;
          res.json(promotion);
        });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
      //  res.write('Updating the promotion: ' + req.params.id + '\n');
  //  res.end('Will update the promotion: ' + req.body.name +
          //  ' with details: ' + req.body.description);
          Promotions.findByIdAndUpdate(req.params.id, {
            $set: req.body
          }, {
            new: true
          }, function(err, promotion){
            if (err) throw err;
            res.json(promotion);
          });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
      //  res.end('Deleting promotion: ' + req.params.id);
      Promotions.findByIdAndRemove(req.params.id, function(err, resp){
        if (err) throw err;
        res.json(resp);
      });
});

/**
 * Expose `promoRouter`.
 */
module.exports = promoRouter;
