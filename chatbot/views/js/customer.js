var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var express = require("express");
var session = require('express-session');
var path = require('path');
var app = express();
const logout = require('express-passport-logout');

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

app.use(express.static('./chatbot/views'));

app.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    return res.redirect('./html/customer.html');
})


var CustomerSchema = mongoose.Schema({
    CustomerName: { type: Object, unique: true },
    password: { type: String },
    FirstName: String,
    LastName: String,
    Points: { type: Number, default: 0 },
    number: Number
});
var Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;

app.get('/logout', (req, res, next) => {
    req.logout();

    req.session = null;

    res.redirect("./html/tryrest.html");
});

app.listen(3000);
console.log('Connect to host!');


