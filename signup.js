var express = require("express");
var bodyParser = require("body-parser");


var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/restaurantweb/?retryWrites=true&w=majority',{
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

app.get('/', function (req, res) {
	res.set('Access-Control-Allow-Origin', '*');
	return res.redirect('signup.html');
})


app.post('/signup', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var number = req.body.number;

	var data = {
		"name": name,
		"email": email,
		"password": password,
		"number": number
	}
	db.collection('restaurantusers').insertOne(data, function (err, collection) {
		if (err) throw err;
		console.log("Record inserted Successfully");

	});

	return res.redirect('signup_success.html');
})

	.listen(3000)


console.log("server listening at port 3000");