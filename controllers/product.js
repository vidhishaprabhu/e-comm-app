const Product = require("../models/products");
const mongoose = require("mongoose");

async function createProduct(req, res) {
  const product = await Product.create(req.body);
  return res
    .status(201)
    .json({ message: "Product created successfully", product });
}
async function getProduct(req, res) {
  const product = await Product.find();
  return res.status(200).json(product);
}
async function updateProduct(req, res) {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body);
  return res.status(200).json({ message: "Product updated successfully" });
}
async function deleteProduct(req, res) {
  const id = req.params.id;
  const product = await Product.deleteOne({ _id: id });
  return res.status(200).json({ message: "Product deleted successfully" });
}
async function getProductById(req, res) {
  const id = req.params.id;
  const product = await Product.findById(id);
  return res.status(200).json(product);
}

async function getNewProduct(req, res) {
  const product = await Product.find({ isNewProduct: true });
  return res.status(200).json(product);
}
async function getFeaturedProduct(req, res) {
  const product = await Product.find({ isFeatured: true });
  return res.status(200).json(product);
}
async function getProductListing(req, res) {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const search = req.query.search;
    const categoryId = req.query.categoryId;
    const brandId = req.query.brandId;

    const sortBy = req.query.sortBy || 'Price';
    const order = req.query.order === 'asc' ? 1 : -1;
  
    const skip = (page - 1) * limit;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } }
      ];
    }

    if (categoryId) {
      filter.categoryId = new mongoose.Types.ObjectId(categoryId);
    }
    if (brandId) {
      filter.brandId = new mongoose.Types.ObjectId(brandId);
    }

    // const sortOptions = { [sortBy]: order };
    const product = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: order });

    const totalProduct = await Product.countDocuments(filter);

    console.log('TOTAL PRODUCTS:', totalProduct);
console.log('PAGE:', page, 'LIMIT:', limit, 'SKIP:', skip);

    res.status(200).json({
      product,
      pagination: {
        totalProduct,
        currentPage: page,
        totalPage: Math.ceil(totalProduct / limit),
        limit,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getNewProduct,
  getFeaturedProduct,
  getProductListing,
};
