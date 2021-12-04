const express = require('express');
const mongoose = require('mongoose');
const router=express.Router();
const User = require('./models/User');

const app = express();
app.use(express.json())


//Create and Save a Record of a Model:
const users = new User ({
    name: "wassim",
    age: 21
});      
users.save();
console.log(users )


//GET :  RETURN ALL USERS 
router.get('/get',(req,res)=>{
    users.find(function(err,allUsers){
        if(err){
            console.log(err)
        }
        else{
            res.json(allUsers)
        }
    })
})


//POST :  ADD A NEW USER TO THE DATABASE
router.post('/add',(req,res,next)=>{
    users.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });    
})


//PUT : EDIT A USER BY ID 
router.put('/:id', function(req, res,next) {
    users.findByIdAndUpdate(req.params.id, req.body, function (err, editt) {
      if (err) return next(err);
      res.json(editt);
    });
});


//DELETE : REMOVE A USER BY ID 
router.delete('/:id',function(req,res,next){
    users.findByIdAndRemove(req.params.id,req.body,function(err,deleted){
        if (err) return next(err);
        res.json(deleted);
    })
})


//environment variables
require("dotenv").config({path:__dirname+'/config/.env'});

//database connection
const uri = process.env.ATLAS_URI;
const connectDB = async ()=>{
    await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected');
}
connectDB()

// app.use('/server',require('../REST_API/server'))

app.listen(3000,()=>{
    console.log('server is running')
})