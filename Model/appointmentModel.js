const mongoose=require('mongoose')
const appoinmentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slots:{
        type:Array,
        required:true
    }
})

const appoinmentModel=new mongoose.model("appoitment",appoinmentSchema)
module.exports=appoinmentModel