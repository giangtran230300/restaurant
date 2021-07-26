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
app.use(express.static('./chatbot/views'));

// routes
webRoutes(app);

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});
