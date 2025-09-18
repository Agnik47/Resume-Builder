const jwt=require('jsonwebtoken')
const User = require('../models/user.model.js')

const userAuth=async (req,res,next)=>{
    try {
        const authHeader=req.headers.authorization

        const token=req.cookies.token||(authHeader && authHeader.split(" ")[1])

        if(!token)
            return res.status(401).jaon({message:"Unauthorized"})

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user=await User.findById(decodedToken._id)

        req.user=user
        return next()
    } catch (error) {
        console.log("error during authorization:",error.message)
        return res.status(400).json({message:"Unauthorized error"})
    }
}

module.exports=userAuth