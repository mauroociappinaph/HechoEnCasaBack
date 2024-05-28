const Product = require("../models/Products");
const { validationResult } = require("express-validator");

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json({ product });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

 const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (category) {
    filter.categories = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  try {
    const products = await Product.find(filter);
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ categories: req.params.category });
    if (products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProductsByName = async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProductsByName,
  getProductsByCategory,
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
};
