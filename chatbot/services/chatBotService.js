const { response } = require("express");
const request = require("request");

require("dotenv").config();

const template = require("./template");

// Page access token
const VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let callSendAPI = async (sender_psid, response) => {
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
};

let sendTypingOn = (sender_psid) => {
  return new Promise((resolve, reject) => {
    try {
      let request_body = {
        recipient: {
          id: sender_psid,
        },
        sender_action: "typing_on",
      };

      let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
      request(
        {
          uri: url,
          method: "POST",
          json: request_body,
        },
        (err, res, body) => {
          if (!err) {
            resolve("done!");
          } else {
            reject("Unable to send message:" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

let markMessageRead = (sender_psid) => {
  return new Promise((resolve, reject) => {
    try {
      let request_body = {
        recipient: {
          id: sender_psid,
        },
        sender_action: "mark_seen",
      };

      let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
      request(
        {
          uri: url,
          method: "POST",
          json: request_body,
        },
        (err, res, body) => {
          if (!err) {
            resolve("done!");
          } else {
            reject("Unable to send message:" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

let getUserName = (sender_psid) => {
  return new Promise((resolve, reject) => {
    // Send the HTTP request to the Messenger Platform
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: "GET",
      },
      (err, res, body) => {
        console.log(body);
        if (!err) {
          body = JSON.parse(body);
          //let username = `${body.first_name} ${body.last_name}`;
          let user = {
            firstName: body.first_name,
            lastName: body.last_name,
            username: firstName.concat(" ", lastName)
          };
          resolve(user);
        } else {
          console.error("Unable to send message:" + err);
        }
      }
    );
  });
};

let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await getUserName(sender_psid);
      let response1 = { text: `Hello ${user.username}. Wellcome to our restaurant` };
      let response2 = template.templpateGetStartedButton();

      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let handleMainMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = template.templpateMainMenu();

      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let handleDishesMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = template.templateDishesMenu();

      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let handleComboMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = template.templateComboMenu();

      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let handleDDMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = template.templateDDMenu();

      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

// // talk to agent, handover
let handleCareHelp = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        text: "Our agent will be online soon!",
      };

      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let manageReservation = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = template.templateManageReservation();

      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  callSendAPI: callSendAPI,
  handleGetStarted: handleGetStarted,
  getUserName: getUserName,
  handleMainMenu: handleMainMenu,
  handleCareHelp: handleCareHelp,
  handleDishesMenu: handleDishesMenu,
  handleComboMenu: handleComboMenu,
  handleDDMenu: handleDDMenu,
  manageReservation: manageReservation,
};
