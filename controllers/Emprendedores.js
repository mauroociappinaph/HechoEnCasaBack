const Emprendedor = require("../models/Emprendedores");
const { validationResult } = require("express-validator");

const createEmprendedor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password, repeat_password, ...rest } = req.body;

  if (password !== repeat_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Note: No hashing of password here
    const emprendedor = new Emprendedor({ ...rest, password });
    await emprendedor.save();
    return res.status(201).json({ emprendedor });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getEmprendedor = async (req, res) => {
  try {
    const emprendedor = await Emprendedor.findById(req.params.id);
    if (!emprendedor) {
      return res.status(404).json({ message: "Emprendedor not found" });
    }
    return res.status(200).json({ emprendedor });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getEmprendedors = async (req, res) => {
  try {
    const emprendedores = await Emprendedor.find();
    return res.status(200).json({ emprendedores });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateEmprendedor = async (req, res) => {
  try {
    const emprendedor = await Emprendedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!emprendedor) {
      return res.status(404).json({ message: "Emprendedor not found" });
    }
    return res.status(200).json({ emprendedor });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteEmprendedor = async (req, res) => {
  try {
    const emprendedor = await Emprendedor.findByIdAndDelete(req.params.id);
    if (!emprendedor) {
      return res.status(404).json({ message: "Emprendedor not found" });
    }
    return res
      .status(200)
      .json({ message: "Emprendedor deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEmprendedor,
  getEmprendedor,
  getEmprendedors,
  updateEmprendedor,
  deleteEmprendedor,
};
