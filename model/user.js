const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

productName: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
  }
});

module.exports = mongoose.model("product2022", productSchema);