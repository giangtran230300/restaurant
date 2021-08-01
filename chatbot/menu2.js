var MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
var url = 'mongodb+srv://root:root@cluster0.fmgyw.mongodb.net?retryWrites=true&w=majority';
var express = require("express");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



MongoClient.connect(url, {
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
    
}, function (err, db) {
    if (err) throw err;
    var dbo = db.db("bRES");
        dbo.collection("items").find({}).toArray(function ( err, result) {
            if (err) throw err;
            else {

                console.log(result);
                app.use(express.static('./chatbot/views'));
                app.get('html/Foodmenu.html', function (res, req) {
                    var imageURL = req.body.imageURL;
                    var name = req.body.name;
                    var price = req.body.price;

                    var data = {
                        "imageURL": imageURL,
                        "name": name,
                        "price": price
                    }
                    res.result('html/Foodmenu.html');
                })
                
            }

        });
        
        
    });



app.listen(3000);


console.log("server listening at port 3000");
	


