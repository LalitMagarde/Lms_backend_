const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({});

function connect(){
    
    console.log(process.env.MONGODB_URL);
    mongoose.connect(process.env.MONGODB_URL) 
    .then(()=>{
        console.log('connected to db');
    })
    .catch((err)=>{
        console.log(err);
    })  
}

module.exports = connect;