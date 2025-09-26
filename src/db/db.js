const mongoose = require('mongoose');

function connect(){

    mongoose.connect("mongodb://0.0.0.0/LMS(project)")
    .then(()=>{
        console.log('connected to db');
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connect;