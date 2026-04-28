const jwt = require("jsonwebtoken");


const authenticateToken = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next()
    }catch(err){
        return res.status(401).json({message:"wrong token"})
    }
}


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to perform this action.",
        });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
