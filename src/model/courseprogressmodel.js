const mongoose = require('mongoose');


const courseProgressSchema = mongoose.Schema({
    userId:{
        type:String
    },
    courseId:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,ref:"course"
    },
    completed:{
        type:Boolean
    },
    lectures:[
        {type:Number}
    ]
})


const courseProgressModel = mongoose.model('courseProgress',courseProgressSchema);

module.exports = courseProgressModel;