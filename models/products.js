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
  purchasePrice: {
    type: Number,
  },
  sellingPrice: {
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
});

const Product = mongoose.model("product", productSchema);

module.exports = Url;
