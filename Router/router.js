const express = require('express');
const router = new express.Router();

router.get("/",async(req,res)=>{
    res.send("HI I aam the server")
})
module.exports=router