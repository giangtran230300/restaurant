const mongoose = require("mongoose");

let now =  new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(Date.now());

var bookingSchema = mongoose.Schema({
  psid: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: String, default: now },
  arrive_at: { type: String, required: true },
  phone_number: { type: String, required: true },
  people_number: { type: String, required: true },
  note: { type: String },
  checkin: { type: Boolean, default: false },
});

module.exports = mongoose.model("booking", bookingSchema);
