const express = require('express');
const appoinmentModel = require('../Model/appointmentModel');
const bookingModel = require('../Model/bookingModel');
const router = new express.Router();

router.get('/', async (req, res) => {
  res.send('HI I aam the server');
});
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await appoinmentModel.find({});
    res.send(appointments);
  } catch (error) {
    res.status(404).send('Sorrry Server is Getting Error');
  }
});
router.post('/booking', async (req, res) => {
  const bookingProperty = req.body;
  try {
    const booking = new bookingModel({...bookingProperty});
    const bookingAppointment=await booking.save()
    return res.status(201).send(bookingAppointment)
  } catch (error) {
    console.log(error)
    return res.status(404).send({error:"data Not found" ,message:error.message})
  }
});

module.exports = router;
