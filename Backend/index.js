// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors=require('cors')
const cookieParser = require('cookie-parser')

// Import database connection
const { connectDB } = require('./src/config/database.js')

// Import your central API router
const userRouter = require('./src/api/routes/user.route.js'); 
const resumeRouter = require('./src/api/routes/resume.route.js');
const matchingRouter = require('./src/api/routes/matchSkills.route.js');

// Connect to the database
connectDB();

//use all cors
app.use(cors({
  origin:[
    "*"
  ],
 credentials:true
}))

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))


// Mount the API router
app.use('/users',userRouter)

app.use('/resumes',resumeRouter)

app.use('/matching',matchingRouter)



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});