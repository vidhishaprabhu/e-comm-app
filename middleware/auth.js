const jwt=require('jsonwebtoken');

function verifyToken(req,res,next){
  const token =req.header("Authorization");
  console.log("AUTH HEADER:",token);
  if(!token){
    return res.status(400).json('Access Denied');
  }
  try{
    const decode=jwt.verify(token,'secret');
    console.log("Decode",decode);
    req.user=decode;
    console.log("Request-user",req.user);
    next();
  }
  catch(error){
    return res.status(401).json({message:error.message});
  }
}
function isAdmin(req,res,next){
  if(req.user && req.user.isAdmin){
    next();
  }
  else{
    return res.status(400).json({message:'Forbidden'});
  }
}
module.exports={verifyToken,isAdmin};