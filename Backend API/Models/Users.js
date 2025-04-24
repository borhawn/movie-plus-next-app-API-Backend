const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  newsletter: {
    type: Boolean,
    required:true
  },
  rank:{
    type: Number,
    default: 1
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  lastlogin:{
    type: Date,
    default: null
  },
  favorites : [{
    type:Schema.Types.ObjectId,
    ref:'Movies',
    default:null
}]
  
});

module.exports = mongoose.model("Users", User);
