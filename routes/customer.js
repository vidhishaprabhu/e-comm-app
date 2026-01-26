const express=require('express');
const router=express.Router();
const {getNewProduct}=require('../controllers/product');
const {getFeaturedProduct}=require('../controllers/product');
const {getCategory}=require('../controllers/category')
const {getProductListing}=require('../controllers/product')
const {getBrand}=require('../controllers/brand')
router.get('/new-product',getNewProduct);
router.get('/featured-product',getFeaturedProduct)
router.get('/categories',getCategory);
router.get('/product-list',getProductListing)
router.get('/brands',getBrand);
module.exports=router;