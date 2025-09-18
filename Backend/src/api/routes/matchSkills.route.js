const express=require('express')
const  userAuth  = require('../../middleware/auth.middleware.js')
const { getSkillGap } = require('../../controller/resume.controller.js')

const matchingRouter=express.Router()

matchingRouter.post('/skil-gap',userAuth,getSkillGap)

module.exports=matchingRouter