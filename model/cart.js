const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

productID: {
    type: String,
    require: true,
  },
quantity: {
  type : Number,
  default: 1,
},
});


module.exports = mongoose.model("cart2022", cartSchema);