const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema({
    title:{
        type:String
    },
    video:{
        type:String
    },
    isFree:{
        type:Boolean
    }
})


const lectureModel = mongoose.model('lecture',lectureSchema);


module.exports = lectureModel;