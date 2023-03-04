const mongoose=require('mongoose')
require('dotenv').config()

 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@my-doctor.ayxo8ea.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
console.log(process.env.DB_USER)
mongoose.connect(uri,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('DB connected') ) .catch((err)=>console.log('error')+err.message)