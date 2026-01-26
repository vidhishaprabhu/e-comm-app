const express=require('express');
const router=express.Router();
const {createProduct}=require('../controllers/product');
const {getProduct}=require('../controllers/product');
const {updateProduct}=require('../controllers/product');
const {deleteProduct}=require('../controllers/product');
const {getProductById}=require('../controllers/product');

router.post('/',createProduct);
router.get('/',getProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);
router.get('/:id',getProductById);


module.exports=router;