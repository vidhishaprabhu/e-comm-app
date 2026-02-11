const mongoose=require('mongoose');
const cartSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true,
  },
  productId:{
    type:Array(String)
  },
  quantity:{
    type:Number

  }
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;