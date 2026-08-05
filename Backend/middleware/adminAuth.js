import jwt from "jsonwebtoken";

const adminAuth = async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            return res.json({success:false,message:"not authorised login agian"})
        }
        const token = authHeader.split(" ")[1];

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.PASSWORD){
            return  res.json({success:false,message:"not authorised login again"})
        }
       return next()

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})        
        
    }
}

export default adminAuth;