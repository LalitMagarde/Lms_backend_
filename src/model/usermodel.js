const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    admin:{
        type:Boolean
    },
    image:{
        type:String
    },
    courses:[
     {type:mongoose.Schema.Types.ObjectId,ref:'course'}
    ]
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;