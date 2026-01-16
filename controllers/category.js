const Category=require('../models/category');

async function handleCreateCategory(req,res) {
  const category=await Category.create(
    req.body
  )
  return res.status(201).json({message:'Category created successfully',category}); 
}
async function getCategory(req,res) {
  const category=await Category.find();
  return res.status(200).json({message:'Categories fetched successfully',Category:category});
  
}
async function updateCategory(req,res) {
  const categoryUpdate=req.body;
  const id=req.params.id;

  const category= await Category.findOneAndUpdate({
    _id:id
  },categoryUpdate);
  return res.status(200).json({message:"Categories updated successfully",Category:category});  
}

async function deleteCategory(req,res) {
  const id=req.params.id;
  const category=await Category.findOneAndDelete({_id:id});
  return res.status(200).json({message:"Categories deleted successfully"}); 
}

async function getCategoryById(req,res) {
  const id=req.params.id;
  const category=await Category.findById({_id:id});
  return res.status(200).json(category);
  
}
module.exports={handleCreateCategory,updateCategory,deleteCategory,getCategory,getCategoryById}