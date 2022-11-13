const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  name: { type: String },
  description: String,
  quantity: {
    type: Number,
    
  },
  image :{
    type:String
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
