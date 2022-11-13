require("dotenv")
const jwt = require('jsonwebtoken')
const generateToken= (user) => {
    return jwt.sign({
        id:user._id,
        email:user.email,

    },process.env.SECRET,
    {expiresIn:"30d"}
    )
}
const authMiddleWare = async (req,res,next) =>{
     const authorization = req.headers.authorization
     if(authorization){
        const token = authorization.slice(7, authorization.length)
     jwt.verify(token , process.env.SECRET,(err,decode)=>{
        if(err){
            return res.status(401).send({msg:"user not allowed"})
        }
        else{
            req.user = decode
            next()
        }
     })
    }

}
module.exports = {generateToken,authMiddleWare}