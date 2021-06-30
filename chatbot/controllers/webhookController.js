require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const chatBotService = require("../services/chatBotService");
var router = express.Router();

//tokens
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let postWebhook = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

let getWebhook = (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    response = {
      text: `You sent the message: "${received_message.text}"`,
    };
  } else if (received_message.attachments) {
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {};
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    // Booking restaurant's services
    // case "RESERVE_SERVICE":
    //   await chatBotService.handleReserve(sender_psid);
    //   break;

    // // Restaurant menu
    // case "MAIN_MENU":
    //   await chatBotService.handleMainMenu(sender_psid);
    //   break;

    // case "DISHES_MENU":
    //   await chatBotService.handleDishesMenu(sender_psid);
    //   break;

    // case "COMBO_MENU":
    //   await chatBotService.handleComboMenu(sender_psid);
    //   break;

    // case "DRINK_DESSERT":
    //   await chatBotService.handleDDMenu(sender_psid);
    //   break;

    // Chatbot start
    //case "RESTART":
    case "GET_STARTED":
      await chatBotService.handleGetStarted(sender_psid);
      break;

    // case "CARE_HELP":
    //   await chatBotService.handleCareHelp(sender_psid);
    //   break;

    default:
      response = { text: `Default message for ${payload}!` };
  }

  //Send the message to acknowledge the postback
  chatBotService.callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

    await sendTypingOn(sender_psid);
    await markMessageRead(sender_psid);

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

let messengerProfile = async (req, res) => {
  // Construct the message body
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://bres-restaurant.herokuapp.com/"],
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
        console.log("Set up messenger profile success!");
      } else {
        console.error("Unable to set up profile:" + err);
      }
    }
  );

  return res.send("Set up profile seuccess!");
};

// let persistentMenu = async (req, res) => {
//   // Construct the message body
//   let request_body = {
//     get_started: { payload: "GET_STARTED" },
//     whitelisted_domains: ["https://bres-restaurant.herokuapp.com/"],
//   };

//   // Send the HTTP request to the Messenger Profile Platform
//   await request(
//     {
//       uri: `https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
//       qs: { access_token: PAGE_ACCESS_TOKEN },
//       method: "POST",
//       json: request_body,
//     },
//     (err, res, body) => {
//       console.log(body);
//       if (!err) {
//         console.log("Set up messenger profile success!");
//       } else {
//         console.error("Unable to set up profile:" + err);
//       }
//     }
//   );

//   return res.send("Set up profile seuccess!");
// };

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook,
  handleMessage: handleMessage,
  handlePostback: handlePostback,
  callSendAPI: callSendAPI,
  messengerProfile: messengerProfile,
  //persistentMenu: persistentMenu,
};
