const express=require('express');
const router=express.Router();
const {createBrand}=require('../controllers/brand');
const {getBrand}=require('../controllers/brand');
const {updateBrand}=require('../controllers/brand');
const {deleteBrand}=require('../controllers/brand');
const {getBrandById}=require('../controllers/brand');

router.post('/',createBrand);
router.get('/',getBrand);
router.put('/:id',updateBrand);
router.delete('/:id',deleteBrand);
router.get('/:id',getBrandById);

module.exports=router;

