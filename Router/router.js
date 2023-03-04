const express = require('express');
const appoinmentModel = require('../Model/appointmentModel');
const router = new express.Router();


router.get("/",async(req,res)=>{
    res.send("HI I aam the server")
})
router.get("/appointments",async(req,res)=>{
    try{
        const appointments=await appoinmentModel.find({})
        res.send(appointments)
    }catch(error){
       res.status(404).send("Sorrry Server is Getting Error")
    }
})

module.exports=router
