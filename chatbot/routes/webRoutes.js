require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const webhookController = require("../controllers/webhookController");
var router = express.Router();

let initRoutes = (app) => {
  router.get("/", function (req, res) {
    res.sendFile("Foodmenu.html", { root: "./chatbot/restaurant" });
  });

  // webhook routes
  router.post("/webhook", webhookController.postWebhook);
  router.get("/webhook", webhookController.getWebhook);

  router.post("/webhook/user-profile", webhookController.messengerProfile);

  router.post("/webhook/persistent-menu", webhookController.persistentMenu);

  return app.use("/", router);
};

module.exports = initRoutes;
