const mongoose = require("mongoose");

var bookingSchema = mongoose.Schema({
  psid: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  arrive_at: { type: Date, required: true },
  phone_number: { type: String, required: true },
  people_number: { type: String, required: true },
  note: { type: String },
  checkin: { type: Boolean, default: false },
});

module.exports = mongoose.model("booking", bookingSchema);
