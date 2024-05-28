const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/Users");

module.exports = router;
