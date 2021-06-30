require("dotenv").config();

const IMAGE_RESTAURANT_URL = "https://cutt.ly/ynPzL9Z";
const IMAGE_MENU = "";
const IMAGE_MENU_APPETIZER = "";
const IMAGE_MENU_MAIN = "";
const IMAGE_MENU_DESSERT = "";
const IMAGE_MENU_COMBO = "";
const IMAGE_SERVICE = "";
const IMAGE_ROOM = "";

let templpateGetStartedButton = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Welcome to Bes restaurant",
            subtitle: "Tap a button to start.",
            image_url: IMAGE_RESTAURANT_URL,
            buttons: [
              {
                type: "postback",
                title: "Restaurant menu",
                payload: "MAIN_MENU",
              },
              //   {
              //     "type": "web_url",
              //     "url": `${process.env.RESERVE_WEBVIEW_URL}`,
              //     "title": "Reserve service",
              //     "webview_height_ratio": "tall",
              //     "messenger_extensions": true
              //   },
              {
                type: "web_url",
                url: `${process.env.WEBVIEW_URL}`,
                title: "Reserve service",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let templpateGetStartedButton = () => {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Welcome to Bes restaurant",
              subtitle: "Tap a button to start.",
              image_url: IMAGE_RESTAURANT_URL,
              buttons: [
                {
                  type: "postback",
                  title: "Restaurant menu",
                  payload: "MAIN_MENU",
                },
                {
                  "type": "web_url",
                  "url": `${process.env.WEBVIEW_URL}`,
                  "title": "Visit our website",
                },
              ],
            },
          ],
        },
      },
    };
    return response;
  };

let templateDishesMenu = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Appetizer",
            subtitle: "This is our menu for Appetizer dishes.",
            image_url: IMAGE_MENU_APPETIZER,
            buttons: [
              {
                type: "web_url",
                title: "View Appetizer",
                url: "https://fb-appointment.herokuapp.com/",
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: "Main dishes",
            subtitle: "Variety of dishes.",
            image_url: IMAGE_MENU_MAIN,
            buttons: [
              {
                type: "web_url",
                title: "VIEW MAIN DISHES",
                url: "https://fb-appointment.herokuapp.com/",
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: "Drink and dessert",
            subtitle: "Cola, wine, sweets and more",
            image_url: IMAGE_MENU_DESSERT,
            buttons: [
              {
                type: "web_url",
                title: "VIEW DRINK AND DESSERT",
                url: "https://fb-appointment.herokuapp.com/",
                webview_height_ratio: "full",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let templateComboMenu = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "MEAT COMBO",
            subtitle: "Combo with meat.",
            image_url: IMAGE_MENU_COMBO,
            buttons: [
              {
                type: "web_url",
                title: "VIEW COMBO",
                url: "https://fb-appointment.herokuapp.com/",
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: "SEAFOOD COMBO",
            subtitle: "Combo with seafood.",
            image_url: IMAGE_MENU_COMBO,
            buttons: [
              {
                type: "web_url",
                title: "VIEW COMBO",
                url: "https://fb-appointment.herokuapp.com/",
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: "Grilled and hotpot",
            subtitle: "Grilled and hotpot",
            image_url: IMAGE_MENU_COMBO,
            buttons: [
              {
                type: "web_url",
                title: "VIEW COMBO",
                url: "https://fb-appointment.herokuapp.com/",
                webview_height_ratio: "full",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let templateDDMenu = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Drink and dessert",
            subtitle: "Cola, wine, sweets and more",
            image_url: IMAGE_MENU_DESSERT,
            buttons: [
              {
                type: "web_url",
                title: "VIEW DRINK AND DESSERT",
                url: "https://fb-appointment.herokuapp.com/",
                webview_height_ratio: "full",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

module.exports = {
  templpateGetStartedButton: templpateGetStartedButton,
  templpateMainMenu: templpateMainMenu,
  templateDDMenu: templateDDMenu,
  templateComboMenu: templateComboMenu,
  templateDishesMenu: templateDishesMenu,
};
