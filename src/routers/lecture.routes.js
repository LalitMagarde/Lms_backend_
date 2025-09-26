const express = require('express');
const lectureModel = require('../model/lecturemodel');
const router = express.Router();


module.exports = router;


router.post('/addlecture',async (req,res)=>{
    try{
        
        const lecture = await lectureModel.create(req.body);
        res.status(200).json(lecture._id);
    }
    catch(error){
        console.log(error);
    }

})


router.get('/findlecture/:lectureid',async (req,res)=>{
    try{
       const {lectureid} = req.params;

       const lecture = await lectureModel.findOne({
        _id:lectureid
       })

       res.status(200).json(lecture);
    }
    catch(error){
        console.log(error);
    }
})

router.post('/updatelecture/:lectureid',async(req,res)=>{
    try{
        
        const {_id}= req.body; 
        await lectureModel.updateOne({_id},req.body);
        res.status(200).json({message:"lecture successfullyupdated"});
    }
    catch(error){
        console.log(error);
    }
})