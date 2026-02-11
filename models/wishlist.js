const mongoose=require('mongoose')
const wishlistSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true,
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true,
  }
});

const WishList = mongoose.model("wishlists", wishlistSchema);
module.exports = WishList;