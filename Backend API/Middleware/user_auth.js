const jwt=require("jsonwebtoken")
const jwtSecret = process.env.JWTSECRET || 'secret';

module.exports.userAuth = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,jwtSecret)
        req.userData=decoded
        next()
    }
    catch(err){
        req.userData = null
        return res.status(401).json({
            message:"ورود غیر مجاز",
            errors:err
        })
    }
}

module.exports.frontAuthReq = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,jwtSecret)
        req.userData=decoded
        return res.status(200).json({
            userData:decoded
        })
    }
    catch(err){
        req.userData = null
        return res.status(401).json({
            error:"Failed auth",
            errors:err
        })
    }
}



