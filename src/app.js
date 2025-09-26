const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

const app = express();

dotenv.config();



const Razorpay = require('razorpay');


const userRoutes = require('./routers/user.routes');
const courseRoutes=require('./routers/course.routes');
const lectureRoutes = require('./routers/lecture.routes');
const courseProgressRoutes = require('./routers/courseProgress.routes');
// const paymentRoutes = require('./routers/payment.routes');




var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});



app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use('/user',userRoutes);
app.use('/courses',courseRoutes);
app.use('/lectures',lectureRoutes);
app.use('/courseprogress',courseProgressRoutes);
// app.use('/payment',paymentRoutes);



app.post('/payment/create_order',async (req,res)=>{
    try{
      
      const {amount} = req.body;

         var options = {
        amount, 
        currency: "INR",
        // receipt: "order_rcptid_11"
        };

        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json(order)
    }
    catch(error){
       console.log(error);
    }
   
})

app.post('/payment_validate',async (req,res)=>{
  try{
    console.log(req.body);
      const{razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

  //  generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);

   const sha = crypto.createHmac('sha256',"JdeFlLXmT2sqLVywixFbSHyx");

   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
   const generated_signature = sha.digest("hex");


    if (generated_signature == razorpay_signature) {
      console.log("payment successfull");
        res.status(200).json({
          message:"payment successfull",
          razorpay_order_id,
          razorpay_payment_id
        })
     }
}
  catch(error){
    console.log(error);
  }
  
})
















module.exports = app;