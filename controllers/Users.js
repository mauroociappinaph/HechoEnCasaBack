const User = require("../models/Users");
const { validationResult } = require("express-validator");

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  const { name, email } = req.query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (email) {
    filter.email = { $regex: email, $options: "i" };
  }

  try {
    const users = await User.find(filter);
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUsersByEmail = async (req, res) => {
  try {
    const users = await User.find({
      email: { $regex: req.params.email, $options: "i" },
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUsersByEmail,
};
