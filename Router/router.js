const express = require('express');
const addPosting = require('../function/addPosting');
const appoinmentModel = require('../Model/appointmentModel');
const bookingModel = require('../Model/bookingModel');
const router = new express.Router();

router.get('/', async (req, res) => {
  res.send('HI I aam the server');
});
router.get('/appointments', async (req, res) => {
    const date=req.query.bookingDate
    
  try {
    const appointments = await appoinmentModel.find({});
    const bookedAppointments=await bookingModel.find({bookingDate:date})
    console.log(bookedAppointments)
    // appoinmentModel.forEach(element => {
    //     const alreadyBooked=bookedAppointments.filter(item=>item.===element.slots)
    // });
    // console.log(bookedAppointments)
    res.send(appointments);
  } catch (error) {
    console.log(error)
    res.status(404).send('Sorrry Server is Getting Error');
  }
});

router.post('/booking', async (req, res) => {
    const bookingProperty = req.body;
    console.log(bookingProperty)
   addPosting(bookingModel,bookingProperty,res,201)
  });

module.exports = router;
