var express = require('express');
var bodyParser = require('body-parser');

var Database = require('./models/db');
var routes = require('./routes/controller');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));



// Website routes
app.use('/', routes);

app.listen(3000, function () {
    console.log("Starting at port 3000...");
});