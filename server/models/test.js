const mongoose  = require("mongoose");
const { Schema } = mongoose;
const testSchema = new Schema({
  name:String,
  number:{
    type:Number,
    required:true,

  },
  createdAt :{
    type:Date,
    default:new Date()
  }
});
const Test = mongoose.model('test',testSchema)
module.exports = Test