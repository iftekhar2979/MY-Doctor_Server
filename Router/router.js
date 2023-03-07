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

    appointments.forEach(element => {
     const filteredAppointment=bookedAppointments.filter(item=>item.service===element.name)
    const bookedService=filteredAppointment.map(item=>item.time)
    const remainingSlot=element.slots.filter(slot=>!bookedService.includes(slot))
    element.slots=remainingSlot
    
    });

    res.send(appointments);
  } catch (error) {
    console.log(error)
    res.status(404).send('Sorrry Server is Getting Error');
  }
})
// router.get('/v2/appointments',async(req,res)=>{
//   const date=req.query.bookingDate
//   try{
//     const appointments=await appoinmentModel.aggregate([
//       {
//         $lookup:{
//           from:"bookingModel",
//           localField:"name",
//           foreignField:"service",
//           pipeline:[
//             {
//               $match:{
//                 $expr:{
//                   $eq:["$bookingDate",date]
//                 }
//               }
//             }
//           ],
//           as:'booked'
//         }
        
//       },
//       {
//         $project:{
//           name:1,
//           slots:1,
//           booked:{
//             $map:{
//               input:'$booked',
//               as:'book',
//               in:'$$book.slot'
//             }
//           }
//         }
//       },
//       {
//         $project:{
//           name:1,
//           slots:{
//             $setDifference:["$slots","$booked"]
//           }
//         }
//       }
//     ])
   
//     res.send(appointments)
//   }
//   catch(error){
//     console.log(error)
//     res.send(error)
//   }
// })

router.post('/booking',async(req,res)=>{
  const bookingProperty = req.body;
  const {bookingDate,service,email}=bookingProperty
 
  try {

    const postingData = new bookingModel({ ...bookingProperty });
    const count=await bookingModel.find({bookingDate,service,email})
    if(count.length){
      
      return res.send({message:`you have already booked ${service}`})
    }
    const savePostingData = await postingData.save();
    return res.status(200).send(savePostingData);
  } catch (error) {

    console.log(error)
    return res.status(404).send({ error: error.message });
  }
})
router.get('/userbooking',async(req,res)=>{
 const email=req.query.email
  const bookedAppointments=await bookingModel.find({email})
 res.send(bookedAppointments)
})
// router.post('/booking', async (req, res) => {
//     const bookingProperty = req.body;
//    addPosting(bookingModel,bookingProperty,res,201)
//   });

module.exports = router;
