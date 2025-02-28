const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');



const authRoutes = require('./routes/authRoutes');


const port = process.env.PORT || 5500;


dotenv.config();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Specify the exact origin and configure to allow others
  credentials: true, // Allow credentials (cookies)
}));

app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI ).then ((res) => { app.listen(port, () => {
  console.log('Server is running on port 5500');
});}).catch((err) => console.log("error connecting to databs" , err));

// Routes
app.get('/',  (req, res) => {
   console.log("here")
   
    res.cookie("check" , "from server")
    res.json({ message: 'Hello World' , here : "myval" });
});

app.use(authRoutes)


 
 
