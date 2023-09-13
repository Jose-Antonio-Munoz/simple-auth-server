const jwt=require('jsonwebtoken')
require('dotenv').config()
jwtSecret=process.env.JWTSECRET


exports.userAuth=async (req,res,next)=>{
    try{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,jwtSecret,(err,decodeToken)=>{
            if (err){
                res.status(401).json({ message: "No autorizado" })
            }else{
                req.userId=decodeToken.userId
                next();
            }
        })
    }else{
        return res.status(401).json({ message: "No autorizado, el token no se encuentra disponible" })
    
    }
    }catch(err){
        return res.status(500).json({ message: 'error interno del servidor', error: err.message });
    }
}