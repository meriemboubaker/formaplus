const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String },
  email: String,
  password: {
    type: String,
    
  },
 image:String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const User = mongoose.model("user", userSchema);
module.exports = User;