var express = require("express");
var bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');

var app = express();

const nexmo = new Nexmo({
    apiKey: 'e824a441',
    apiSecret: 'nfqbcxv53ZmDewbo'
})

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/bRES?retryWrites=true&w=majority', {
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

app.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    return res.redirect(__dirname + 'views/html/tryrest.html');
})
    .listen(3000)
console.log("server listening at port 3000");
