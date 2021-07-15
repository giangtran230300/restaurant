var express = require("express");
var bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

var app = express();

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
app.use(express.static(__dirname));

app.get('/', function (req, res) {
	res.set('Access-Control-Allow-Origin', '*');
	return res.redirect('html/booknotlogin.html');
})


app.post('/booking', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var arrive_at = req.body.arrive_at;
	var phone_number = req.body.phone_number;
	var people_number = req.body.people_number;

	var data = {
		"name": name,
		"email": email,
		"people_number": people_number,
		"phone_number": phone_number,
		"arrive_at": arrive_at
	}
	db.collection('bookings').insertOne(data, function (err, collection) {
		if (err) throw err;
		console.log("Record inserted Successfully");

	});

    const output = `
     <p> You have a new contact request</p >
        <h3> Reservation Details</h3>
    <ul>
        <li>Name: $(req.body.name)</li>
        <li>Email: $(req.body.email)</li>
        <li>Phone number: $(req.body.phone_number)</li>
        <li>Number of people: $(req.body.people_number)</li>
        <li>Arrive at: $(req.body.arrive_at)</li>
    </ul>
        
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'huonggiangtranthi1234@gmail.com', 
            pass: 'MHoang290808', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with unicode symols
    let mailOptions = {
        from: '"brestaurant" <huonggiangtranthi1234@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello this is bRES", // Subject line
        text: "Reservation of bRES", // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }


        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    });
    return res.redirect({ msg: 'Email has been sent, please check' }, 'html/book_success.html');

})

	.listen(3000)


console.log("server listening at port 3000");