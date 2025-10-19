const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


module.exports.authMiddleware = (req,res,next)=>{
    try{
        console.log(req.cookies.jwt_token);
        const token = req.cookies.jwt_token;
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
    catch{
       console.log(error);
    }
}