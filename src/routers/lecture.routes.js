const express = require('express');
const lectureModel = require('../model/lecturemodel');
const { authMiddleware } = require('../middleware/authmiddleware');
const router = express.Router();
const cloudinary  = require('cloudinary').v2;



module.exports = router;


router.post('/addlecture',authMiddleware,async (req,res)=>{
    try{
        const newlecture = JSON.parse(req.body.lecture); 
        const file= req.files.file;
        console.log(file);
        const result = await cloudinary.uploader.upload(file.tempFilePath,
            {
               resource_type: "video",   
               folder: "course_videos", 
            }
        );

        newlecture.video=result.secure_url;

        console.log(newlecture);
        
        const lecture = await lectureModel.create(newlecture);
        res.status(200).json(lecture._id);
    }
    catch(error){
        console.log(error);
    }

})


router.get('/findlecture/:lectureid',authMiddleware,async (req,res)=>{
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

router.post('/updatelecture/:lectureid',authMiddleware,async(req,res)=>{
    try{
        
        const {_id}= req.body; 
        await lectureModel.updateOne({_id},req.body);
        res.status(200).json({message:"lecture successfullyupdated"});
    }
    catch(error){
        console.log(error);
    }
})