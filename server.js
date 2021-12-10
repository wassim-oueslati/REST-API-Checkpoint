const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

//environment variables
require("dotenv").config({path:__dirname+'/config/.env'});

//database connection
const uri = process.env.ATLAS_URI;
const connectDB = async ()=>{
    await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected');
}
connectDB()

// routes
app.use("/api/users",require("./routes"))


app.listen(3000,()=>{
    console.log('server is running')
})