const express = require('express');
const receiptModel = require('../model/Receiptmodel');
const router = express.Router();
const {authMiddleware} = require('../middleware/authmiddleware');

module.exports = router;


router.post('/add_receipt',authMiddleware,async (req,res)=>{
    try{
      const receipt = await receiptModel.create(req.body);

      res.status(200).json(receipt);
    }
    catch(error){
        console.log(error);
    }
})


router.get('/getreceipt/:userid',authMiddleware,async (req,res)=>{
    try{
        const {userid} = req.params;
        const receipt = await receiptModel.find({
            userId:userid,
        }) 
        
        // console.log(receipt);
        res.status(200).json(receipt);
    }
    catch(error){
        console.log(error);
    }
})


router.get('/getallreceipt',authMiddleware,async (req,res)=>{
    try{

        const receipts = await receiptModel.find(); 

        res.status(200).json(receipts);
    }
    catch(error){
        console.log(error);
    }
})