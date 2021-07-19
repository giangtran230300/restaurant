require("dotenv").config();
const express = require("express");
const request = require("request");
const chatBotService = require("../services/chatBotService");
const reservationController = require("../controllers/reservationController");

// db
var Reservation = require("../models/booking");
var Customer = require("../models/customer");

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
  // Get the payload for the postback
  let payload = received_message.quick_reply.payload;

  // Set the response based on the postback payload
  switch (payload) {
    // Reservation manage
    // show
    case "LATEST_RESERVATION":
      await handleViewReservation(sender_psid);
      break;

    // update
    // case "UPDATE_RESERVATION":
    //   await handleUpdateReservation(sender_psid, reservation_id);
    //   break;
    // case "UPDATE_YES":
    //   await handleCancelReservation(sender_psid);
    //   break;

    //cancel
    case "CANCEL_RESERVATION":
      await chatBotService.manageCancelReservation(sender_psid);
      break;
    case "CANCEL_YES":
      await handleCancelReservation(sender_psid);
      break;
  }
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    // Restaurant menu
    case "MAIN_MENU":
      await chatBotService.handleMainMenu(sender_psid);
      break;

    case "DISHES_MENU":
      await chatBotService.handleDishesMenu(sender_psid);
      break;

    case "COMBO_MENU":
      await chatBotService.handleComboMenu(sender_psid);
      break;

    case "DRINK_DESSERT":
      await chatBotService.handleDDMenu(sender_psid);
      break;

    // Chatbot start
    case "RESTART":
    case "GET_STARTED":
      await chatBotService.handleGetStarted(sender_psid);
      break;

    // Manage reservation
    case "MANAGE_RESERVATION":
      await chatBotService.manageReservation(sender_psid);
      break;
    //talk to agent
    case "CARE_HELP":
      await chatBotService.handleCareHelp(sender_psid);
      break;

    default:
      response = { text: `Default message for ${payload}!` };
  }

  //Send the message to acknowledge the postback
  //chatBotService.callSendAPI(sender_psid, response);
}

let messengerProfile = async (req, res) => {
  // Construct the message body
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://bres-restaurant.herokuapp.com/"],
  };

  // Send the HTTP request to the Messenger Profile Platform
  request(
    {
      uri: `https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("Set up profile success!");
      } else {
        console.error("Unable to set up profile:" + err);
      }
    }
  );

  return res.send("Set up profile seuccess!");
};

let persistentMenu = async (req, res) => {
  // Construct the message body
  let request_body = {
    get_started: { payload: "GET_STARTED" },
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
            url: "https://bres-restaurant.herokuapp.com/",
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
};

let handleReservationData = async (req, res) => {
  try {
    var body = req.body;

    const psid = body.psid;
    let user = await chatBotService.getUserName(psid);
    const customerName = body.customerName;
    const phoneNumber = body.phoneNumber;
    const peopleNumber = body.peopleNumber;
    const reserveDate = body.reserveDate;
    const reserveTime = body.reserveTime;
    var reserveAt = reserveDate.concat(" ", reserveTime);
    const note = body.note;

    let response1 = {
      text: "You have made a reservation. We are waiting to see you at our restaurant <3.",
    };

    let response2 = {
      text: `---Reservation information---
        \nName: ${customerName}
        \nPhone number: ${phoneNumber}
        \nNumber of people: ${peopleNumber}
        \nReserve date: ${reserveDate}
        \nReserve time: ${reserveTime}
        \nNote: ${note}.`,
    };

    // confirm message
    await chatBotService.callSendAPI(psid, response1);
    await chatBotService.callSendAPI(psid, response2);

    // save to db
    var reservation = new Reservation({
      psid: psid,
      name: customerName,
      arrive_at: reserveAt,
      phone_number: phoneNumber,
      people_number: peopleNumber,
      note: note,
    });

    reservation.save((err, doc) => {
      if (err) console.log(err);
      else console.log("Reservation created.");
    });

    const query = { PhoneNumber: phoneNumber };
    const update = {
      $set: {
        "CustomerName.FirstName": user.firstName,
        "CustomerName.LastName": user.lastName,
        PhoneNumber: phoneNumber,
      },
    };
    const options = { upsert: true };

    Customer.collection.findOneAndUpdate(
      query,
      update,
      options,
      function (err, doc) {
        if (err) console.log(err);
        else console.log("Customer saved.");
      }
    );

    return res
      .status(200)
      .json({ message: "Get reservation data successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error get reservation data: ", error });
  }
};

let handleViewReservation = (sender_psid) => {
  const query = {
    $and: [
      { psid: sender_psid },
      { checkin: false },
      { note: { $ne: "Canceled" } }
    ]
  };
  const options = { upsert: false };

  Reservation.collection.findOne(query, options, function (err, doc) {
    if (err) console.log(err);
    else {
      let response = {
        text: `---Reservation created at ${doc.created_at}---
          \nPhone number: ${doc.phone_number}
          \nNumber of people: ${doc.people_number}
          \nReserve time: ${doc.arrive_at}
          \nNote: ${doc.note}.`,
      };

      // send reservation messages
      chatBotService.callSendAPI(sender_psid, response);

      console.log(doc);
      console.log("send reservation to view.");
    }
  });
};

let handleUpdateReservation = async (req, res) => {
  try {
    var body = req.body;

    const psid = body.psid;
    let user = await chatBotService.getUserName(psid);
    const customerName = body.customerName;
    const phoneNumber = body.phoneNumber;
    const peopleNumber = body.peopleNumber;
    const reserveDate = body.reserveDate;
    const reserveTime = body.reserveTime;
    var reserveAt = reserveDate.concat(" ", reserveTime);
    const note = body.note;

    let response1 = {
      text: "You have made a reservation. We are waiting to see you at our restaurant <3.",
    };

    let response2 = {
      text: `---Reservation information---
        \nName: ${customerName}
        \nPhone number: ${phoneNumber}
        \nNumber of people: ${peopleNumber}
        \nReserve date: ${reserveDate}
        \nReserve time: ${reserveTime}
        \nNote: ${note}.`,
    };

    // confirm message
    await chatBotService.callSendAPI(psid, response1);
    await chatBotService.callSendAPI(psid, response2);

    // save to db
    var reservation = new Reservation({
      psid: psid,
      name: customerName,
      arrive_at: reserveAt,
      phone_number: phoneNumber,
      people_number: peopleNumber,
      note: note,
    });

    reservation.save((err, doc) => {
      if (err) console.log(err);
      else console.log("Reservation created.");
    });

    const query = { PhoneNumber: phoneNumber };
    const update = {
      $set: {
        "CustomerName.FirstName": user.firstName,
        "CustomerName.LastName": user.lastName,
        PhoneNumber: phoneNumber,
      },
    };
    const options = { upsert: true };

    Customer.collection.findOneAndUpdate(
      query,
      update,
      options,
      function (err, doc) {
        if (err) console.log(err);
        else console.log("Customer saved.");
      }
    );

    return res
      .status(200)
      .json({ message: "Get reservation data successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error get reservation data: ", error });
  }
};

let handleCancelReservation = (sender_psid) => {
  const query = {
    $and: [
      { psid: sender_psid },
      { checkin: false },
      { note: { $ne: "Canceled" } },
    ],
  };
  const update = {
    $set: { note: "Canceled" },
  };
  const options = { upsert: false };

  Reservation.collection.findOneAndUpdate(
    query,
    update,
    options,
    function (err, doc) {
      if (err) console.log(err);
      else {
        let response1 = {
          text: "Your reservation has been canceled.",
        };
        let response2 = {
          text: `---Canceled reservation information---
          \nPhone number: ${doc.value.phone_number}
          \nNumber of people: ${doc.value.people_number}
          \nReserve time: ${doc.value.arrive_at}.`,
        };

        // send cancel messages
        chatBotService.callSendAPI(sender_psid, response1);
        chatBotService.callSendAPI(sender_psid, response2);

        console.log("Cancel reservation");
      }
    }
  );
};

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook,
  handleMessage: handleMessage,
  handlePostback: handlePostback,
  messengerProfile: messengerProfile,
  persistentMenu: persistentMenu,
  handleReservationData: handleReservationData,
  handleUpdateReservation: handleUpdateReservation,
  handleViewReservation: handleViewReservation,
  handleCancelReservation: handleCancelReservation,
};
