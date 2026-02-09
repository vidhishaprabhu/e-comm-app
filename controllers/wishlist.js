const WishList = require('../models/wishlist');
const wishlist=require('../models/wishlist');
const wishlistRouter = require('../routes/wishlist');

async function addToWishlist(req, res) {
  try {
    const wishlist = await WishList.create({
      productId: req.body.productId,
      userId: req.user.id   
    });

    res.status(201).json({
      success: true,
      data: wishlist // use 'data' instead of 'wishlist'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


async function getWishListById(req,res){
  const id=req.params.id;
  const wishlist=await WishList.find({_id:id})
  return res.status(200).json({wishlist});
}
async function getWishList(req,res) {
  const wishlist=await WishList.find({ userId: req.user.id })
  return res.status(200).json({wishlist});  
}
async function deleteWishList(req, res) {
  try {
    const productId = req.params.id;
    const userId = req.user.id; // from middleware

    const wishlist = await WishList.findOneAndDelete({
      productId: productId,
      userId: userId,
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    return res.status(200).json({
      message: "Wishlist deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports={addToWishlist,getWishListById,getWishList,deleteWishList}