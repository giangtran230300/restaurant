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

  router.post("/webhook/persistent-menu", (req, res) => {
    // Construct the message body
    let request_body = {
      persistent_menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: "postback",
              title: "Start conversation",
              payload: "RESTART",
            },
            {
              type: "postback",
              title: "My reservation",
              payload: "MANAGE_RESERVATION",
            },
            {
              type: "postback",
              title: "Talk to an agent",
              payload: "CARE_HELP",
            },
            {
              type: "web_url",
              title: "Visit our website",
              url: "https://bres-restaurant.herokuapp.com/", // change to Giang's when deployed
            },
          ],
        },
      ],
    };

    // Send the HTTP request to the Messenger Profile Platform
    await request(
      {
        uri: `https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: "POST",
        json: request_body,
      },
      (err, res, body) => {
        console.log(body);
        if (!err) {
          console.log("Set up persistent menu success!");
        } else {
          console.error("Unable to set up persistent menu:" + err);
        }
      }
    );
    return res.send("Set up persistent menu seuccess!");
  });

  return app.use("/", router);
};

module.exports = initRoutes;
