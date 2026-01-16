const express=require('express');
const router=express.Router();
const app=express();
const Category=require('../models/category')
const {handleCreateCategory}=require('../controllers/category');
const {updateCategory}=require('../controllers/category');
const {deleteCategory}=require('../controllers/category');
const {getCategory}=require('../controllers/category')
const {getCategoryById}=require('../controllers/category');

router.post("/",handleCreateCategory);

router.get("/",getCategory);

router.put("/:id",updateCategory);

router.get("/:id",getCategoryById);

router.delete("/:id",deleteCategory);
module.exports=router;