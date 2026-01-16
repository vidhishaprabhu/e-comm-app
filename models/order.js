const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date:{
    type:Date
  },
  item:{
    type:Array(any)
  },
  status:{
    type:Number
  }
});

const Order = mongoose.model("orders", categorySchema);
module.exports = Order;