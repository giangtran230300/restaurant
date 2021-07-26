require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const webhookController = require("../controllers/webhookController");
const reservationController = require("../controllers/reservationController");
var router = express.Router();

let initRoutes = (app) => {
  router.get("/", function (req, res) {
    res.sendFile("tryrest.html", { root: "./chatbot/views/html" });
  });

  // webhook routes
  router.post("/webhook", webhookController.postWebhook);
  router.get("/webhook", webhookController.getWebhook);

  router.post("/webhook/user-profile", webhookController.messengerProfile);
  router.post("/webhook/persistent-menu", webhookController.persistentMenu);

  router.get("/reserve", function (req, res) {
    res.sendFile("reserve.html", { root: "./chatbot/views" });
  });
  router.post("/reserve-post", webhookController.handleReservationData);
  
  router.get("/test", reservationController.getReservationList);
  router.post("/test", reservationController.postReservation);

  return app.use("/", router);
};

module.exports = initRoutes;
