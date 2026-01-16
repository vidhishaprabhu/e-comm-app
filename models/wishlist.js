const wishlistSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true,
  },
  productId:{
    type:Array(String)
  }
});

const WishList = mongoose.model("wishlists", wishlistSchema);
module.exports = WishList;