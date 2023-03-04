const mongoose=require('mongoose')
const bookingSchema=new mongoose.Schema({
    service:{
        type:String,
        required:true
    },
    bookingDate:{
        type:String,
        required:true
    },
    patientName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    }
})
const bookingModel=new mongoose.model("booking",bookingSchema)
module.exports=bookingModel