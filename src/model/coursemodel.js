const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title:{
       type:String
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    level:{
        type:String
    },
    author:{
        type:String
    },
    authorid:{
        type:String
    },
    lectures:[
        {type:mongoose.Schema.Types.ObjectId,ref:"lecture"}
    ],
    
    thumbnail:{
        type:String
    },
    status:{
        type:String
    },
    subtitle:{
        type:String
    },
    description:{
        type:String
    }
})

const courseModel = mongoose.model('course',courseSchema);

module.exports = courseModel ;