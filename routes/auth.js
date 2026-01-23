const express=require('express');
const router=express.Router();
const {registerUser}=require('../controllers/auth')
const {loginUser}=require('../controllers/auth')
const {editProfile}=require('../controllers/auth')
const {verifyToken}=require('../middleware/auth')
router.post("/register",async(req,res)=>{
  const body=req.body;
  if(body.name && body.email && body.password){
    const result = await registerUser(req,res);
  }
  else{
    return res.status(400).json("Please provide name,email and password");
  }
});
router.post("/login",async(req,res)=>{
  const body=req.body;
  if(body.email && body.password){
    const result=await loginUser(req,res)
    if(result){
      res.send(result);
    }
    else{
      return res.status(400).json("Email or password is incorrect");
    }
  }
  else{
    return res.status(400).json("Please provide email and password")
  }
});
router.put("/edit-profile",verifyToken,editProfile);
module.exports=router