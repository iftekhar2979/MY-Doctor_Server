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
    
    // console.log('form booked appoinment',bookedAppointments)
    // console.log('booked appointment',bookedAppointments)
    appointments.forEach(element => {
     const filteredAppointment=bookedAppointments.filter(item=>item.service===element.name)
    const bookedService=filteredAppointment.map(item=>item.time)
    const remainingSlot=element.slots.filter(slot=>!bookedService.includes(slot))
    console.log(date , element.name,remainingSlot.length)
    });
    // console.log(bookedAppointments)
    res.send(appointments);
  } catch (error) {
    console.log(error)
    res.status(404).send('Sorrry Server is Getting Error');
  }
});

router.post('/booking', async (req, res) => {
    const bookingProperty = req.body;
   addPosting(bookingModel,bookingProperty,res,201)
  });

module.exports = router;
