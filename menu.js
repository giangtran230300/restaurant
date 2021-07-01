var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/restaurantweb/?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("reporting-administrating-sys");
    dbo.collection("items").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

