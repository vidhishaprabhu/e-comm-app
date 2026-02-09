const express=require('express');
const router=express.Router();
const {getNewProduct, getProductById}=require('../controllers/product');
const {getFeaturedProduct}=require('../controllers/product');
const {getCategory}=require('../controllers/category')
const {getProductListing}=require('../controllers/product')
const {getBrand}=require('../controllers/brand')
const {getWishListById}=require('../controllers/wishlist')
const {deleteWishList}=require('../controllers/wishlist')
const {getWishList}=require('../controllers/wishlist');
router.get('/new-product',getNewProduct);
router.get('/featured-product',getFeaturedProduct)
router.get('/categories',getCategory);
router.get('/product-list',getProductListing);
router.get('/brand',getBrand);
router.get('/product/:id',getProductById);
router.get('/wishlist/:id',getWishListById);
router.get('/wishlist',getWishList);
router.delete("/wishlist/:id",deleteWishList);
module.exports=router;