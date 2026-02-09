const express=require('express');
const wishlistRouter=express.Router();
const {addToWishlist}=require('../controllers/wishlist')
const {getWishListById}=require('../controllers/wishlist')
const {getWishList}=require('../controllers/wishlist')
const {deleteWishList}=require('../controllers/wishlist');
wishlistRouter.post("/",addToWishlist)
wishlistRouter.get("/:id",getWishListById)
wishlistRouter.get("/",getWishList);
wishlistRouter.delete("/:id",deleteWishList);

module.exports=wishlistRouter;