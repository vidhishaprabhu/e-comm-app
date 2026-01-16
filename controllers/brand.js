const Brand=require('../models/brand');

async function createBrand(req,res) {
  const brand=await Brand.create(
    req.body
  )
  return res.status(201).json({message:'Brand Created successfully',brand});
  
}
async function getBrand(req,res) {
  const brand=await Brand.find();
  return res.status(200).json({message:'Brand fetched successfully',Brand:brand});
  
}
async function updateBrand(req,res) {
  const id=req.params.id;
  const brand=await Brand.findByIdAndUpdate({_id:id},req.body);
  return res.status(200).json({message:'Brand Updated successfully'}); 
}

async function deleteBrand(req,res) {
  const id=req.params.id;
  const brand=await Brand.deleteOne({_id:id});
  return res.status(200).json({message:'Brand deleted successfully'});
  
}
async function getBrandById(req,res){
  const id=req.params.id;
  const brand=await Brand.findById(id);
  return res.status(200).json(brand);
}
module.exports={createBrand,getBrand,updateBrand,deleteBrand,getBrandById};