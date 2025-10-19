const mongoose = require('mongoose');

const receiptSchema = mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,ref:"course"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    },
    course:{
        type:String
    },
    paymentId:{
        type:String
    },
    amount:{
        type:Number
    },
    date:{
       type:String
    }
})

const receiptModel = mongoose.model('receipt',receiptSchema);

module.exports = receiptModel;

