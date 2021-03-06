var express = require("express");
var bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/restaurantweb?retryWrites=true&w=majority',{
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
	return res.redirect(__dirname + 'views/html/signup.html');
})


app.post('/signup', function (req, res) {
    
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    
    var email = req.body.email;
    var password = req.body.password;
    var number = req.body.number;
    var Gender = req.body.Gender;

    var data = {
        "CustomerName": [{
            "FirstName": FirstName,
            "LastName": LastName
        }],
        "email": email,
        "password": password,
        "number": number,
        "Gender": Gender

    }
    db.collection('restaurantusers').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'bresrestaurant@gmail.com', // generated ethereal customer
            pass: 'MHoang290808', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with unicode symols
    let mailOptions = {
        from: '"brestaurant" <bresrestaurant@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: '<p>You have got a new account on bRES website</b><ul><li>Username:' + req.body.name + '</li><li>Email:' + req.body.email + '</li><li>phone_number:' + req.body.phone_number + '</li><li>Number of people:' + req.body.people_number + '</li><li>Arrive at:' + req.body.arrive_at + '</li></ul>', // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        else {
            console.log("Message sent: %s", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            return res.redirect(__dirname + 'views/html/signup_success.html');
        }
        


    });
    
})

	.listen(3000)


    console.log("server listening at port 3000");