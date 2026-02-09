const jwt=require('jsonwebtoken');

function verifyToken(req, res, next) {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  // if (token.startsWith("Bearer ")) {
  //   token = token.slice(7);
  // }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
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