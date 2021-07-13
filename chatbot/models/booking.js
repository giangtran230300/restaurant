const mongoose = require("mongoose");

var bookingSchema = mongoose.Schema({
//   psid: { type: String },
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  arrive_at: { type: Date },
  phone_number: { type: String },
  people_number: { type: String },
  note: { type: String },
  checkin: { type: Boolean, default: false }
});

module.exports = mongoose.model("booking", bookingSchema);
