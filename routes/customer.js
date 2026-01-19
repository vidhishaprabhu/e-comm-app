const express=require('express');
const router=express.Router();
const {getNewProduct}=require('../controllers/product');
const {getFeaturedProduct}=require('../controllers/product');

router.get('/new-product',getNewProduct);
router.get('/featured-product',getFeaturedProduct)

module.exports=router;