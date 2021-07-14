require("dotenv").config();

const IMAGE_RESTAURANT_URL = "https://cutt.ly/ynPzL9Z";
const IMAGE_MENU = "";
const IMAGE_MENU_APPETIZER = "";
const IMAGE_MENU_MAIN = "";
const IMAGE_MENU_DESSERT = "";
const IMAGE_MENU_SET_1 = "https://cdn.lauphan.com/photo-storage/myFile-1617847170490.jpeg";
const IMAGE_MENU_SET_2 = "https://cdn.lauphan.com/photo-storage/myFile-1617847257643.jpeg";
const IMAGE_MENU_SET_3 = "https://cdn.lauphan.com/photo-storage/myFile-1617847283857.jpeg";
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
              {
                type: "web_url",
                url: `${process.env.RESERVE_WEBVIEW_URL}`,
                title: "Reserve now",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
              {
                type: "web_url",
                url: `${process.env.WEBVIEW_URL}`,
                title: "Visit our website",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let templpateMainMenu = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Our menu",
            subtitle: "This is our menu for lunch and dinner.",
            image_url: IMAGE_RESTAURANT_URL,
            buttons: [
              {
                type: "postback",
                title: "Dishes",
                payload: "DISHES_MENU",
              },
              {
                type: "postback",
                title: "COMBO MENU",
                payload: "COMBO_MENU",
              },
              {
                type: "postback",
                title: "Drink and Dessert",
                payload: "DRINK_DESSERT",
              },
            ],
          },
          {
            title: "TABLES AND ROOMS",
            subtitle:
              "Accomodates up to 250 customers, has tables for 2/4/6 people, private room and has great garden views.",
            image_url: IMAGE_RESTAURANT_URL,
            buttons: [
              {
                type: "web_url",
                title: "VIEW ROOM",
                url: `${process.env.WEBVIEW_URL}`,
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: "OUR SERVICES",
            subtitle: "We provide services for your meal, organize events.",
            image_url: IMAGE_RESTAURANT_URL,
            buttons: [
              {
                type: "web_url",
                title: "BIRTHDAY PARTY",
                url: `${process.env.WEBVIEW_URL}`,
                webview_height_ratio: "full",
              },
              {
                type: "web_url",
                title: "ANNIVERSARY",
                url: `${process.env.WEBVIEW_URL}`,
                webview_height_ratio: "full",
              },
              {
                type: "web_url",
                url: `${process.env.RESERVE_WEBVIEW_URL}`,
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
            title: "Set 1",
            subtitle: "199.000 đ",
            image_url: IMAGE_MENU_SET_1,
            buttons: [
              {
                type: "web_url",
                title: "Detail",
                url: IMAGE_MENU_SET_1,
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: "Set 2",
            subtitle: "299.000 đ",
            image_url: IMAGE_MENU_SET_2,
            buttons: [
              {
                type: "web_url",
                title: "Detail",
                url: IMAGE_MENU_SET_2,
                webview_height_ratio: "full",
              },
            ],
          },
          {
            title: "Set 3",
            subtitle: "399.000 đ",
            image_url: IMAGE_MENU_SET_3,
            buttons: [
              {
                type: "web_url",
                title: "Detail",
                url: IMAGE_MENU_SET_3,
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
            title: "Cocacola",
            subtitle: "15.000 đ",
            image_url: "http://img.websosanh.vn/v2/users/wss/images/tet-loc-6-lon-coca-cola/xtmwn931w7fbz.jpg",
          },
          {
            title: "Pepsi",
            subtitle: "15.000 đ",
            image_url: "https://cdn.tgdd.vn/Products/Images/2443/76467/bhx/nuoc-ngot-pepsi-cola-330ml-202008131510316142.JPG",
          },
          {
            title: "Fanta",
            subtitle: "15.000 đ",
            image_url: "https://cdn.tgdd.vn/Products/Images/2443/76453/bhx/nuoc-ngot-fanta-vi-cam-lon-330ml-201812281420358633.jpg",
          },
          {
            title: "Champagne",
            subtitle: "150.000 đ",
            image_url: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1606928160-tc-bollinger-1606928114.jpg",
          },
          {
            title: "Smoothie",
            subtitle: "45.000 đ",
            image_url: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/19/1462829771-sunshine-daydream.jpg",
          },
        ],
      },
    },
  };
  return response;
};

let templateManageReservation = () => {
  
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Manage reservations",
              subtitle: "View/Update/Cancel your nearest reservation.",
              image_url: IMAGE_MENU_DESSERT,
              buttons: [
                  {
                    type: "postback",
                    title: "Latest reservation",
                    payload: "LATEST_RESERVATION",
                  },
                  {
                    type: "postback",
                    title: "Update reservation",
                    payload: "UPDATE_RESERVATION",
                  },
                  {
                    type: "postback",
                    title: "Cancel reservation",
                    payload: "CANCEL_RESERVATION",
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
  templateManageReservation: templateManageReservation,
};
