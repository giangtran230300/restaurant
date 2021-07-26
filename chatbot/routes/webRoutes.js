require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const webhookController = require("../controllers/webhookController");
const reservationController = require("../controllers/reservationController");
var router = express.Router();

let initRoutes = (app) => {
  router.get("/", function (req, res) {
<<<<<<< HEAD
    res.sendFile("tryrest.html", { root: "./chatbot/views/html" });
=======
    res.sendFile("tryrest.html", { root: "./chatbot/restaurant/html" });
>>>>>>> 61c64c65357cb21b048c7fc51a2a10c69f9c0be6
  });

  // webhook routes
  router.post("/webhook", webhookController.postWebhook);
  router.get("/webhook", webhookController.getWebhook);

  router.post("/webhook/user-profile", webhookController.messengerProfile);
  router.post("/webhook/persistent-menu", webhookController.persistentMenu);

  router.get("/reserve", function (req, res) {
<<<<<<< HEAD
    res.sendFile("reserve.html", { root: "./chatbot/views/html" });
=======
    res.sendFile("reserve.html", { root: "./chatbot/restaurant" });
>>>>>>> 61c64c65357cb21b048c7fc51a2a10c69f9c0be6
  });
  router.post("/reserve-post", webhookController.handleReservationData);
  
  router.get("/test", reservationController.getReservationList);
  router.post("/test", reservationController.postReservation);

  return app.use("/", router);
};

module.exports = initRoutes;
