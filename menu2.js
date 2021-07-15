var express = require("express");
var bodyParser = require("body-parser");


var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/reporting-administrating-sys?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});

var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
	console.log("connection succeeded");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(__dirname));

app.get(
	db.collection('items').find({}).toArray(function (err, collection) {
		if (err) throw err;
		console.log(succeeded);
	}));
res.return('html/Foodmenu.html');
	


