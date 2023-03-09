const { Binary } = require('mongodb')
const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    displayName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
  
})
const userModel=new mongoose.model("users",userSchema)
module.exports=userModel