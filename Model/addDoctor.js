const mongoose=require('mongoose')
const doctorSchema=new mongoose.Schema({
    doctorName:{
        type:String,
        required:true
    },
    doctorEmail:{
        type:String,
        required:true
    },
    specialities:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        
    }
})
const doctorModel=new mongoose.model('doctors',doctorSchema)
module.exports=doctorModel