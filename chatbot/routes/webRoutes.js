require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const webhookController = require('../controllers/webhookController')
var router = express.Router();

let initRoutes = (app) => {
    router.get('/', function (req, res) {
        res.sendFile('Foodmenu.html', {root: './restaurant'})
    })

    // webhook routes
    router.post('/webhook',  webhookController.postWebhook);
    router.get('/webhook',  webhookController.getWebhook);

    return app.use('/', router);
} 

module.exports = initRoutes;