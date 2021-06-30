require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const webRoutes = require('./routes/webRoutes')

let app = express();

// HTML here
app.use(express.static('./chatbot/restaurant'));

// routes
webRoutes(app);
  
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});

//