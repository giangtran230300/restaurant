const mongoose = require('mongoose');

var reservation = mongoose.model('reservation', {
    name: { type: String },
    time: { type: String },
    date: { type: Date },
    phone_number: { type: String },
    people_number: { type: String }
});

module.exports = { reservation };