const mongoose=require('mongoose');
const cartSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true,
  },
  items: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }
]

});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;