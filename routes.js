const express = require('express');

const router=express.Router();

const User = require('./models/User');


//Create and Save a Record of a Model:
const users = new User ({
    name: "wassim",
    age: 21
});      
users.save();
console.log(users )


//GET :  RETURN ALL USERS 
router.get('/get',(req,res)=>{
    User.find(function(err,allUsers){
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
    User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });    
})


//PUT : EDIT A USER BY ID 
router.put('/:id', function(req, res,next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, editt) {
      if (err) return next(err);
      res.json(editt);
    });
});


//DELETE : REMOVE A USER BY ID 
router.delete('/:id',function(req,res,next){
    User.findByIdAndRemove(req.params.id,req.body,function(err,deleted){
        if (err) return next(err);
        res.json(deleted);
    })
})

module.exports=router