const express = require('express');
const userModel = require('../model/usermodel');
const router = express.Router();
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/authmiddleware');


module.exports = router;


dotenv.config();

router.get('/logout',async (req,res)=>{
    try{
       res.clearCookie('jwt_token',{
                    // protocol
                    httpOnly: true,
                    // protocol is secure https
                    secure: true,
                    // allows the cookie to send accross diffrent domain
                    sameSite: 'None',
                    // sets the expire of cookie

                })

        res.status(200).json({message:"cookie deleted successfully"})
    }
    catch(error){
        console.log(error);
    }
})


router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, id } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            admin: false,
            image: "",
            course: []

        })

        // console.log(user);
    }
    catch (error) {
        console.log(error);
    }

})

router.post('/users', async (req, res) => {

    try {
        const { email, password } = req.body;

        const currentUser = await userModel.findOne({
            email
        })

        if (currentUser) {
            const isMatch = await bcrypt.compare(password, currentUser.password);
            if (isMatch) {


                const token = jwt.sign(
                    {
                        userid: currentUser._id,
                        email: currentUser.email
                    }
                    , process.env.SECRET_KEY
                );

                // console.log(token);

                res.cookie('jwt_token', token, {
                    // protocol
                    httpOnly: true,
                    // protocol is secure https
                    secure: true,
                    // allows the cookie to send accross diffrent domain
                    sameSite: 'None',
                    // sets the expire of cookie
                    maxAge: 24 * 60 * 60 * 1000
                });

                // res.status(200).json({'token':token});

                res.status(200).json(currentUser.toObject());



            }
            else {
                return res.status(401).json({ message: "wrong credientials" })
            }
        }
    }
    catch (error) {
        console.log(error);
    }

})

router.patch('/update/:id', authMiddleware, async (req, res) => {

    try {
        const updatedUser = req.body;
        // console.log(updatedUser);
        const _id = req.params.id;

        // console.log(_id);
        await userModel.updateOne({ _id }, updatedUser);

        res.status(200).json({ message: 'user updated' });

    }
    catch (error) {
        console.log(error);
    }
})


router.get('/:userid/courses', authMiddleware, async (req, res) => {
    try {
        const { userid } = req.params;

        const user = await userModel.findOne({
            _id: userid
        }).populate("courses");


        if (user) {
            res.status(200).json(user.courses);
        }
        else {
            res.status(200).json({ message: "no user exist" })
        }


    }
    catch (error) {
        console.log(error);
    }

})
