const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:String,
    age:Number
})


module.exports=User= mongoose.model('User', personSchema)