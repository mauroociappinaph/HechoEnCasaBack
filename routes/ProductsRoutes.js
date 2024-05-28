const express = require("express");

const router = express.Router();
const  {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByName,
} = require("../controllers/Products.js");

module.exports = router;