require("dotenv").config();

const IMAGE_RESTAURANT_URL = "https://cutt.ly/ynPzL9Z";

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
                "type": "web_url",
                "url": `${process.env.WEBVIEW_URL}`,
                "title": "Reserve service",
                "webview_height_ratio": "tall",
                "messenger_extensions": true
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
}