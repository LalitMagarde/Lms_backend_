const express = require('express');
const router = express.Router();
const instance = require('../app');
module.exports = router;



router.post('/create_order',async (req,res)=>{
    try{
       
         var options = {
        amount: 50000,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        receipt: "order_rcptid_11"
        };

        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json(order)
    }
    catch(error){
       console.log(error);
    }
   
})