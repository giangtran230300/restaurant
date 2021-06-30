(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "Messenger");

window.extAsyncInit = function () {
  // the Messenger Extensions JS SDK is done loading
  MessengerExtensions.getContext(
    '1131265184063906',
    function success(thread_context) {
      // success
      $("#psid").val(thread_context.psid);
      handleReservation();
    },
    function error(err) {
      // error
    }
  );
};

//validate inputs
function validateInputFields() {
    let customerName = $("#customerName");
    let phoneNumber = $("#phoneNumber");

    if (!customerName.val() === "") {
        customerName.addClass("is-invalid");
        return true;
    } else {
        email.removeClass("is-invalid");
    }

    if (phoneNumber.val() === "") {
        phoneNumber.addClass("is-invalid");
        return true;
    } else {
        phoneNumber.removeClass("is-invalid");
    }

    return false;
};

function handleReservation() {
    $("#btnReserve").on("click", function (e) {
        let check = validateInputFields(); //return true or false

        let data = {
            psid: $("#psid").val(),
            customerName: $("#customerName").val(),
            phoneNumber: $("#phoneNumber").val()
        };

        if (!check) {
            //close webview
            MessengerExtensions.requestCloseBrowser(function success() {
                // webview closed
            }, function error(err) {
                // an error occurred
                console.log(err);
            });

            //send data to node.js server 
            $.ajax({
                url: `${window.location.origin}/reserve-post`,
                method: "POST",
                data: data,
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    });
};