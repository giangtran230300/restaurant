const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var Reservation = require("../models/booking");

let getReservationList = (req, res) => {
  Reservation.find((err, docs) => {
    if (!err) {
      res.render("booking", { reservations: docs });
    } else {
      console.log(
        "Error in Retriving Reservation :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

let postReservation = (req, res) => {
  const reserveDate = body.reserveDate;
  const reserveTime = body.reserveTime;
  var reserveAt = reserveDate.concat(" ", reserveTime);

  let arrive = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(reserveAt);

  var reservation = new Reservation({
    psid: req.body.psid,
    name: req.body.customerName,
    arrive_at: arrive,
    phone_number: req.body.phoneNumber,
    people_number: req.body.peopleNumber,
    note: req.body.note,
  });
  reservation.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Reservation Save :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

module.exports = {
  getReservationList: getReservationList,
  postReservation: postReservation,
};
