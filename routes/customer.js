const express=require('express');
const router=express.Router();
const {getNewProduct}=require('../controllers/product');
const {getFeaturedProduct}=require('../controllers/product');
const {getCategory}=require('../controllers/category')
router.get('/new-product',getNewProduct);
router.get('/featured-product',getFeaturedProduct)
router.get('/categories',getCategory);
module.exports=router;