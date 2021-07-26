var bodyParser = require("body-parser");
var express = require("express");
var session = require('express-session');
var path = require('path');
var app = express();
const logout = require('express-passport-logout');



const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/restaurantweb?retryWrites=true&w=majority', {
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


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    return res.redirect('Restaurant/html/login.html');
})

/**
* POST /login
* Sign in with email and password
*/
app.post('/login', function (req, res) {
	var PhoneNumber = req.body.PhoneNumber;
	var password = req.body.password;
    db.collection('restaurantusers').findOne({ PhoneNumber: PhoneNumber, password: password }, function (err, customer) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!customer) {
            return res.status(404).send();
        }
        return res.status(200).send;
    })
    return res.redirect( 'Restaurant/html/customer.html');
});

app.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('Restaurant/html/tryrest.html'); 
    });

});


app.listen(3000);
console.log('Connect to host!');
