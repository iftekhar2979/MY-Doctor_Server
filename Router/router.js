const express = require('express');
const addPosting = require('../function/addPosting');
const getFromDatabase = require('../function/getFromDatabase');
const appoinmentModel = require('../Model/appointmentModel');
const bookingModel = require('../Model/bookingModel');
const userModel = require('../Model/userSchema');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const { Query } = require('mongoose');
const doctorModel = require('../Model/addDoctor');

const varifyJWT=(req,res,next)=>{
const authHeaders=req.headers.authorization

if(!authHeaders){
return  res.status(403).send({error:"UnAuthorized access"})
}
const token=authHeaders.split(' ')[1]

jwt.verify(token,process.env.TOKEN,function(error,decoded){
  if(error){
    return res.status(403).send({error:'UnAuthorized Access'})
  }
  req.decoded =decoded
  next()

})
}
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
router.get('/userbooking',varifyJWT,async(req,res)=>{
 const email=req.query.email
 const decodedEmail=req.decoded


 if(decodedEmail.email===email){
   const bookedAppointments=await bookingModel.find({email})
 return res.send(bookedAppointments)

 }
return res.send({error:'UnAuthorized Public'})
})
router.post("/createUser",async(req,res)=>{
  const user=req.body
  delete user.password
  delete user.confirmPassoword
  delete user.termandCondition
  const users=await userModel.find({})
if(users.includes(user.email)){
  console.log('user already added')
  return res.send({error:'email address already added'})
}
  // console.log(user)
  addPosting(userModel,user,res,200)
 
})
router.post('/doctors',async(req,res)=>{
  const doctor=req.body
  addPosting(doctorModel, doctor, res,200)
})
router.get('/getDoctors',async(req,res)=>{
  getFromDatabase(doctorModel,res,200)
})
router.get('/specialities',async(req,res)=>{
  try{
    //aggregate project will findout your porperties which you have inputed value as 1
    const result = await appoinmentModel.aggregate({}).project({name:1}) 
   return res.send(result)

  }catch(error){
    return res.send({error:error.message})
  }
})
router.post('/jwt',async(req,res)=>{
  const userEmail=req.query.email
  try{
    const findEmail=await userModel.findOne({email:userEmail})
const {email}=findEmail
    const token = jwt.sign({email}, process.env.TOKEN, { expiresIn: '1h' });
   return res.send(token);
  }
  catch(error){
   return  res.send({error:error.message})
  }
})
router.get('/findLoggedInUser',async(req,res)=>{
  const user=req.query
  const findUser=await userModel.findOne(user)
  res.send(findUser)

})
router.get('/allUser',async(req,res)=>{
  try{
const users=await userModel.find({})
return res.send(users)
  }catch(error){
    return res.send({errorName:error.name,error:error.message})
  }
})
router.put('/dashboard/admin/:id',varifyJWT,async(req,res)=>{
 
  try{
    const id = req.params.id
    const decodedEmail=req.decoded.email
    const filterEmail={email:decodedEmail}
    const findEmail=await userModel.findOne(filterEmail)
    if(findEmail.role!=='admin'){
      return res.send({error:'UnAuthorized access admin'})
    }

    const query={_id:id}  
    const role=req.body
    const findId=await userModel.findByIdAndUpdate(query,role,{
      returnOriginal: false
    })

  return  res.send(findId)
   
  }catch(err){
    console.log(err.message)
    return res.send({error:err.message})
  }
 
})
router.delete('/delete',async(req,res)=>{
  try{
  const deletethings=await doctorModel.deleteMany({doctorEmail:"salminifti79@gmail.com"})
  res.send(deletethings)
  }catch(err){
    console.log(err)
  }
})
router.get('/user/admin/:email',async(req,res)=>{
  const adminId=req.params.email
  const query={email:adminId}
  const findAdmin=await userModel.findOne(query)
  console.log(findAdmin?.role==='admin')
  console.log(findAdmin)
  res.send({isAdmin:findAdmin?.role==='admin'})
})
// router.post('/booking', async (req, res) => {
//     const bookingProperty = req.body;
//    addPosting(bookingModel,bookingProperty,res,201)
//   });

module.exports = router;
