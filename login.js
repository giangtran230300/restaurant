var crypto = require('crypto');
var bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
var express = require("express");
var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/bREScustomers?retryWrites=true&w=majority', {
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
    return res.redirect('html/login.html');
})

/**
* POST /login
* Sign in with email and password
*/
exports.loginPost = function (req, res, next) {
    req.assert('CustomerName', 'Username is not valid').isEmail();
    req.assert('CustomerName', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('CustomerName').normalizeCustomerName({ remove_dots: false });

    // Check for validation erro
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    customer.findOne({ CustomerName: req.body.CustomerName }, function (err, customer) {
        if (!customer) return res.status(401).send({ msg: 'The email address ' + req.body.CustomerName + ' is not associated with any account. Double-check your email address and try again.' });

        customer.comparePassword(req.body.password, function (err, isMatch) {
            if (!isMatch) return res.status(401).send({ msg: 'Invalid Username or password' });

            // Make sure the customer has been verified
            if (!customer.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });

            // Login successful, write token, and send back customer
            res.send({ token: generateToken(customer), customer: customer.toJSON() });
        });
    });
};

app.listen(3000);
console.log('Connect to host!');