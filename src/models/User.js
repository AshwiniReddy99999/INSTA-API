const mongoose=require('mongoose');

const moment = require("moment")

const userSchema=new mongoose.Schema({
    name:{type:String},
    location:{type:String},
    likes:{type:Number,default:Math.floor(Math.random()*100)+1},
    description:{type:String},
    postImage: {type:String,default:""},
    date:{
        type:String,default:moment().format("MM/DD/YYYY")
       }
    
})

const users=mongoose.model('posts',userSchema)


module.exports=users;