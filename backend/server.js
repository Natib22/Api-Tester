const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user');
const cors = require('cors');


const authRoutes = require('./routes/authRoutes');


const port = process.env.PORT || 5500;


dotenv.config();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI ).then ((res) => { app.listen(port, () => {
  console.log('Server is running on port 5500');
});}).catch((err) => console.log("error connecting to databs" , err));

// Routes
app.get('/',  (req, res) => {
   console.log('Hello World');
  
    res.json({ message: 'Hello World' , here : "myval" });
});

app.use(authRoutes)


 
 
