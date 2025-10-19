const express = require('express');
const courseModel = require('../model/coursemodel');
const { authMiddleware } = require('../middleware/authmiddleware');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

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


router.post('/create_course',authMiddleware,async (req,res)=>{
    try{
        
        const course =await courseModel.create(req.body);

        res.status(200).json(course);
    
    }
    catch(error){
        console.log(error);
    }
})


router.post('/course/updatecourse',authMiddleware,async (req,res)=>{
  try{
        
         if(req.files){

            const file= req.files.file;
            const result = await cloudinary.uploader.upload(file.tempFilePath || `data:${file.mimetype};base64,${file.data.toString('base64')}`)

            //  console.log(result.secure_url);
            
            // console.log(JSON.parse(req.body.updatedCourse));
            const newUpdatedCourse = {...JSON.parse(req.body.updatedCourse),thumbnail:`${result.secure_url}`};

            const {_id} = newUpdatedCourse;

            const course = await courseModel.findByIdAndUpdate(_id,newUpdatedCourse,{new:true});

            // console.log(course);   
            res.status(200).json(course);

           


        }
        else{
            const { _id }= req.body;
            const course = await courseModel.updateOne({_id},req.body);

            console.log(course);   
            res.status(200).json(course);
        }
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


router.delete('/remove_course/:courseid',authMiddleware,async ( req,res)=>{
    try{
        const {courseid} = req.params;

        const course =await courseModel.deleteOne({_id:courseid});

        console.log(course);

        if(course.deletedCount==1){
            res.status(200).json({message:"courseDeleted"});
        }
    }
    catch(error){
        console.log(error);
    }
})