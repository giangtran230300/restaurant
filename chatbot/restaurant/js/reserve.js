(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

window.extAsyncInit = function () {
    // the Messenger Extensions JS SDK is done loading 

    MessengerExtensions.getContext('1131265184063906',
        function success(thread_context) {
            // success
            //set psid to input
            $("#psid").val(thread_context.psid);
            handleReserve();
        },
        function error(err) {
            // error
            console.log('Lỗi đặt bàn Eric bot', err);
        }
    );
};

//validate inputs
function validateInputFields() {
    let customerName = $("#customerName");
    let phoneNumber = $("#phoneNumber");
    let peopleNumber = $("#peopleNumber");
    let reserveDate = $("#reserveDate");
    let reserveTime = $("#reserveTime");

    if (customerName.val() === "") {
        customerName.addClass("is-invalid");
        return true;
    } else {
        customerName.removeClass("is-invalid");
    }

    if (peopleNumber.val() === "") {
        peopleNumber.addClass("is-invalid");
        return true;
    } else {
        peopleNumber.removeClass("is-invalid");
    }
    
    if (reserveDate.val() === "") {
        reserveDate.addClass("is-invalid");
        return true;
    } else {
        reserveDate.removeClass("is-invalid");
    }
    
    if (reserveTime.val() === "") {
        reserveTime.addClass("is-invalid");
        return true;
    } else {
        reserveTime.removeClass("is-invalid");
    }

    if (phoneNumber.val() === "") {
        phoneNumber.addClass("is-invalid");
        return true;
    } else {
        phoneNumber.removeClass("is-invalid");
    }

    return false;
}


function handleReserve() {
    $("#btnReserve").on("click", function (e) {
        let check = validateInputFields(); //return true or false

        let data = {
            psid: $("#psid").val(),
            customerName: $("#customerName").val(),
            phoneNumber: $("#phoneNumber").val(),
            peopleNumber: $("#peopleNumber").val(),
            reserveDate: $("#reserveDate").val(),
            reserveTime: $("#reserveTime").val()
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
}