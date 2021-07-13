const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Reservation = require('../models/booking');

// => localhost:3000/test/
// router.get('/', (req, res) => {
//     Reservation.find((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in Retriving Reservation :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

let getReservationList = (req, res) => {
    Reservation.find((err, docs) => {
        if (!err){ 
             res.send(docs); 
        }
        else {
            console.log('Error in Retriving Reservation :' + JSON.stringify(err, undefined, 2)); 
        }
}
)};

// router.post('/', (req, res) => {
//     var reservation = new Reservation({
//         psid: req.body.psid,
//         name: req.body.name,
//         // arrive_at: req.body.date,
//         phone_number: req.body.phone_number,
//         people_number: req.body.people_number,
//         note: req.body.note,
//     });
//     reservation.save((err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Reservation Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

let postReservation = (req, res) => {
    var reservation = new Reservation({
        psid: req.body.psid,
        name: req.body.customerName,
        arrive_at: req.body.reserveDate,
        phone_number: req.body.phoneNumber,
        people_number: req.body.peopleNumber,
        note: req.body.note,
    });
    reservation.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Reservation Save :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports = {
    getReservationList: getReservationList,
    postReservation: postReservation
};