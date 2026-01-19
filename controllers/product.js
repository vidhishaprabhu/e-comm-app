const Product=require('../models/products');

async function createProduct(req,res) {
  const product=await Product.create(req.body);
  return res.status(201).json({message:'Product created successfully',product});
}
async function getProduct(req,res) {
  const product=await Product.find();
  return res.status(200).json(product);  
}
async function updateProduct(req,res) {
  const id=req.params.id;
  const product=await Product.findByIdAndUpdate({_id:id},req.body);
  return res.status(200).json({message:'Product updated successfully'});  
}
async function deleteProduct(req,res){
  const id=req.params.id;
  const product=await Product.deleteOne({_id:id});
  return res.status(200).json({message:'Product deleted successfully'});
}
async function getProductById(req,res){
  const id=req.params.id;
  const product=await Product.findById(id);
  return res.status(200).json(product);
}

async function getNewProduct(req,res) {
  const product=await Product.find({isNewProduct:true});
  return res.status(200).json(product);
  
}
async function getFeaturedProduct(req,res) {
  const product=await Product.find({isFeatured:true});
  return res.status(200).json(product);
  
}
module.exports={createProduct,getProduct,updateProduct,deleteProduct,getProductById,getNewProduct,getFeaturedProduct};