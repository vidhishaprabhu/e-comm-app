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
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
