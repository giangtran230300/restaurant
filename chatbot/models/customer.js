const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  CustomerName: {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
  },
  Gender: {
    type: String,
  },
  VisitDate: [],
  PhoneNumber: {
    type: String,
    required: true,
  },
  Visited: {
    type: Number,
    default: 0,
  },
  Point: {
    type: Number,
    default: 0,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
