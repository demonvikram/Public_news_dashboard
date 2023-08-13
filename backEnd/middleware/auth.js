const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();

const authn=async(req,res,next)=>{
    //console.log("header", req.header("Authorization").replace("Bearer ",""));
    console.log(req.cookies.cokTok);

    try{
        let token=req.cookies.cokTok || req.body.token||req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(403).json({
                success:false,
                message:'token missing'
            });
        }

        try {
            const logDetails=jwt.verify(token,process.env.JWT_TOKEN);
            req.user=logDetails;
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:'you are not allowed'
            });
        }
        next();
    }
    catch(err){
        return res.status(404).json({
            success:false,
            message:'error in token'
        })
    }
}

module.exports=authn;