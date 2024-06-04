// index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const path= require("path");

// if(process.env.NODE_ENV!=="PRODUCTION"){
//     require('dotenv').config();
// }
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', require('./routes/Routes'));
app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./client/build/index.html"))
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    
}).then(() => {
    console.log(`Connected to MongoDB successfully`);
    const server = app.listen(process.env.PORT, () => {
        console.log(`Listening at PORT: ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log("Error: " + error);
});
