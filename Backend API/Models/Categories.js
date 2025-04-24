const mongoose = require('mongoose')
const { Schema } = mongoose

const Category = new Schema({
    
    name:{
        type:String,
        required:true,
        unique:true,
    },
    file:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    createdat: {
        type: Date,
        default: Date.now,
      }
})

module.exports = mongoose.model('Categories',Category)