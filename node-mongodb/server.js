
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dboper = require('./operations');

var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db){
  assert.equal(err, null);
  console.log("Connected correctly to Server");

  dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes", function(result){
    console.log(result.ops);

    dboper.findDocuments(db, "dishes", function(docs){
      console.log(docs);

      dboper.updateDocument(db, {name: "Vadonut"}, {description: "Updated Test"}, "dishes", function(result){
        console.log(result.result);

        dboper.findDocuments(db, "dishes", function(docs){
          console.log(docs);

          dboper.removeDocument(db, {name: "Vadonut"}, "dishes", function(result){
            console.log(result);

            dboper.findDocuments(db, "dishes", function(docs){
              console.log(docs);

              db.dropCollection("dishes", function(err, result){
                console.log(result);
                db.close();
              });
            });
          })
        });
      });
    });
  });
});
