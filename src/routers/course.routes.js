const express = require('express');
const courseModel = require('../model/coursemodel');
const router = express.Router();

module.exports = router;









/////////////////////////////////////////////////////////////////////////////////



router.get('/allcourses',async(req,res)=>{
    try{
       
        const {authorid} = req.params;

        const courses = await courseModel.find();
        res.status(200).json(courses);
       
    }
    catch(error){
        console.log(error);
    }
})


router.post('/create_course',async (req,res)=>{
    try{
        
        const course =await courseModel.create(req.body);

        res.status(200).json(course);
    
    }
    catch(error){
        console.log(error);
    }
})


router.post('/course/updatecourse',async (req,res)=>{
  try{

        const { _id }= req.body;

       const course = await courseModel.updateOne({_id},req.body);

    //    console.log(course);   
       res.status(200).json(course);
   }
    catch(error){
        console.log(error);
    }
})

router.get('/course/populatedlecture/:courseid',async (req,res)=>{
    try{
          const {courseid} = req.params;

          const course = await courseModel.findOne({
            _id:courseid
          }).populate('lectures');

        //   console.log(course);
          res.status(200).json(course.lectures);
    }
    catch(error){
        console.log(error);
    }
})