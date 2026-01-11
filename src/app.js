const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const cookieparser = require('cookie-parser');

const app = express();

dotenv.config();



const Razorpay = require('razorpay');


const userRoutes = require('./routers/user.routes');
const courseRoutes=require('./routers/course.routes');
const lectureRoutes = require('./routers/lecture.routes');
const courseProgressRoutes = require('./routers/courseProgress.routes');
// const paymentRoutes = require('./routers/payment.routes');
const receiptRoutes = require('./routers/receipt.router');
const cloudinaryRoutes = require('./routers/cloudinary.routes');




var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

console.log(process.env.ORIGIN);

app.use(cors({
  //allows the origin to access the backend resources
  origin: process.env.ORIGIN,
  // origin:'http://localhost:5173',
  // allows the credentials to come from the origin 
  credentials:true
}));


// app.use(fileUpload({ useTempFiles: false }));
app.use(fileUpload({ useTempFiles: true }));


app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieparser());


app.use('/user',userRoutes);
app.use('/courses',courseRoutes);
app.use('/lectures',lectureRoutes);
app.use('/courseprogress',courseProgressRoutes);
app.use('/receipt',receiptRoutes);
// app.use('/payment',paymentRoutes);

// app.use('/cloudinary',cloudinaryRoutes);




app.get('/',(req,res)=>{
  console.log("server is running correctly");
  res.send("server is running correctly");
})




app.post('/payment/create_order',async (req,res)=>{
    try{
      
      const {amount} = req.body;

         var options = {
        amount:amount*100, 
        currency: "INR",
        // receipt: "order_rcptid_11"
        };

        const order = await instance.orders.create(options);
        // console.log(order);
        res.status(200).json(order)
    }
    catch(error){
       console.log(error);
    }
   
})

app.post('/payment_validate',async (req,res)=>{
  try{
    // console.log(req.body);
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