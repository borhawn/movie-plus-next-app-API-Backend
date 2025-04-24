const mongoose = require('mongoose')
const { Schema } = mongoose

const Movie = new Schema({
    
    name:{
        type:String,
        required:true,
    },
    releaseYear:{
        type:String,
    },
    description : {
        type:String,
    },
    duration:{
        type:String,
    },
    file:{
        type: String,
        required: false
    },
    categories : [{
        type:Schema.Types.ObjectId,
        ref:'Categories'
    }],
    slug:{
        type:String,
        required:true,
        unique:true
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

module.exports = mongoose.model('Movies',Movie)