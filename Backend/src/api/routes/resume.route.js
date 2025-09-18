const express=require('express')
const userAuth = require('../../middleware/auth.middleware.js')
const { uploadResume, getUserResumes, getResumeById, updateResume, deleteResume } = require('../../controller/resume.controller')

const resumeRouter=express.Router()

resumeRouter.post('/upload', userAuth, uploadResume);

resumeRouter.get('/', userAuth, getUserResumes);

resumeRouter.get('/:resumeId', userAuth, getResumeById);

resumeRouter.put('/:resumeId', userAuth, updateResume);

resumeRouter.delete('/:resumeId', userAuth, deleteResume);


module.exports=resumeRouter