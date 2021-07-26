require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const webRoutes = require('./routes/webRoutes')
const mongoose = require('./models/db');
const reservationController = require("./controllers/reservationController");

let app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// JS here
app.set('view engine', 'ejs');
<<<<<<< HEAD
app.use(express.static('./chatbot/views'));
=======
app.use(express.static('./chatbot/restaurant'));
>>>>>>> 61c64c65357cb21b048c7fc51a2a10c69f9c0be6

// routes
webRoutes(app);

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});
