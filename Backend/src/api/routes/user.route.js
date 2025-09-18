const express = require('express');
const { userRegister, userSignIn, userProfile, userLogout } = require('../../controller/user.controller.js');
const userAuth = require('../../middleware/auth.middleware.js'); 

const userRouter = express.Router();

// Route for user registration
userRouter.post('/register', userRegister);

// Route for user sign-in (login)
userRouter.post('/signin', userSignIn);

// Route for fetching user profile, requires authentication
userRouter.get('/profile', userAuth, userProfile);

// Route for user sign-out (logout), requires authentication
userRouter.post('/signup', userAuth, userLogout);

module.exports = userRouter;