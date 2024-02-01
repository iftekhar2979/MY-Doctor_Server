const mongoose=require('mongoose')
require('dotenv').config()

 
// console.log(uri)
// console.log(process.env.DB_USER)
mongoose.connect(process.env.DB_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('DB connected') ) .catch((err)=>console.log('error')+err.message)