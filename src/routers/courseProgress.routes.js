const express = require('express');
const courseProgressModel = require('../model/courseprogressmodel');
const { authMiddleware } = require('../middleware/authmiddleware');
const router = express.Router();

module.exports = router;


router.post('/create/:userId/:courseId',authMiddleware,async (req,res)=>{
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

router.get('/getcourseprogress/:userId/:courseId',authMiddleware,async (req,res)=>{
    try{
       const {userId,courseId} = req.params;

       const courseProgress = await courseProgressModel.findOne({
            userId,
            courseId
       }).populate('course');

    //    console.log(courseProgress);

       if(courseProgress){
        res.status(200).json(courseProgress);
       }

    }
    catch(error){
        console.log(error);
    }
})

router.post('/updatecourseprogress/:userId/:courseId',authMiddleware,async (req,res)=>{
    try{
        const {userId,courseId} = req.params;
        const {lectureIndex,courseStatus} = req.body;
        console.log(req.body);

        const courseProgress = await courseProgressModel.findOne({
            userId,
            courseId
        })
        const currentCourseProgress = courseProgress.toObject();
        let updatedCourseProgress;
        if(courseStatus){
            updatedCourseProgress = {...currentCourseProgress,completed:true};
        }
        else{
           updatedCourseProgress = {...currentCourseProgress,lectures:[...currentCourseProgress.lectures,lectureIndex]};
        }
         
        const data = await courseProgressModel.findByIdAndUpdate(courseProgress._id,updatedCourseProgress,{new:true});
        res.status(200).json(data);

    }
    catch(error){
        console.log(error);
    }
})


router.get('/usercourses/:userId',authMiddleware,async(req,res)=>{
    try{
        const {userId} = req.params;

        const courseProgreses = await courseProgressModel.find({
            userId
        })

        res.status(200).json(courseProgreses);

    }
    catch(error){
        console.log(error);
    }
})