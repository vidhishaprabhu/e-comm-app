const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  description: {
    type: String,
  },
  Price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  images: {
    type: Array(String),
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "categories", 
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "brands", 
    required: true,
  },
  isFeatured:{
    type:Boolean,
  },
  isNewProduct:{
    type:Boolean,
  }
},{
  timestamps:true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
