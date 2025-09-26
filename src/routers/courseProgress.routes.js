const express = require('express');
const courseProgressModel = require('../model/courseprogressmodel');
const router = express.Router();

module.exports = router;


router.post('/create/:userId/:courseId',async (req,res)=>{
    try{
        
        const {userId,courseId} = req.params;

        const courseProgress = await courseProgressModel.create({
            userId,
            courseId,
            course:courseId,
            completed:false,
            lectures:[]
        })

        res.status(200).json({message:"courseProgress_created"});
    }
    catch(error){
        console.log(error);
    }
})

router.get('/getcourseprogress/:userId/:courseId',async (req,res)=>{
    try{
       const {userId,courseId} = req.params;

       const courseProgress = await courseProgressModel.findOne({
            userId,
            courseId
       }).populate('courses');

       console.log(courseProgress);

       if(courseProgress){
        res.status(200).json(courseProgress);
       }

    }
    catch(error){
        conaole.log(error);
    }
})