const express = require('express');
const userModel = require('../model/usermodel');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = router;


router.post('/signup',async (req,res)=>{
    try{
         const {name,email,password,id} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        name,
        email,
        password:hashedPassword,
        admin:false,
        image:"",
        course:[]

    }) 

    // console.log(user);
    }
    catch(error){
       console.log(error);
    }
    
})

router.post('/users',async(req,res)=>{
    
    try{
         const {email,password} = req.body;

    const currentUser =await userModel.findOne({
            email
    })

    if(currentUser){
        const isMatch =await bcrypt.compare(password,currentUser.password);
        if(isMatch) return res.status(200).json(currentUser.toObject());
        else{
           return res.status(401).json({message:"wrong credientials"})
        }
    }
    }
    catch(error){
       console.log(error);
    }
    
})

router.patch('/update/:id',async(req,res)=>{

    try{
        const updatedUser = req.body;
        // console.log(updatedUser);
        const _id = req.params.id;

        // console.log(_id);
        await userModel.updateOne({_id},updatedUser);

        res.status(200).json({message:'user updated'});

    }
    catch(error){
        console.log(error);
    }
})


router.get('/:userid/courses',async (req,res)=>{
    try{
       const {userid} = req.params; 

       const user = await userModel.findOne({
           _id:userid
       }).populate("courses");

       
       if(user){
            res.status(200).json(user.courses);
       }
       else{
        res.status(200).json({message:"no user exist"})
       }
       

    }
    catch(error){
       console.log(error);
    }

})
