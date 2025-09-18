const express=require('express')
const  userAuth = require('../../middleware/auth.middleware.js')


const careerPathRouter=express.Router()

careerPathRouter.get('/career-path',userAuth,)

module.exports=careerPathRouter