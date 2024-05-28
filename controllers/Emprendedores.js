const Emprendedor = require("../models/Emprendedores");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const createEmprendedor = async (req, res) => {
  // Log del cuerpo de la solicitud
  console.log("Request Body:", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Log de errores de validación
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { password, repeat_password, email, ...rest } = req.body;

  if (password !== repeat_password) {
    console.log("Passwords do not match:", password, repeat_password);
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Verificar si ya existe un emprendedor con el mismo email
    const existingEmprendedor = await Emprendedor.findOne({ email });
    if (existingEmprendedor) {
      // Log de usuario duplicado
      console.log("Duplicate Emprendedor Email:", email);
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo emprendedor con la contraseña hasheada
    const emprendedor = new Emprendedor({
      email,
      password: hashedPassword,
      ...rest,
    });
    const emprendedorSaved = await emprendedor.save();

    // Log de éxito al guardar
    console.log("Emprendedor creado:", emprendedorSaved);
    return res.status(201).json({ emprendedor: emprendedorSaved });
  } catch (err) {
    // Log de errores de servidor
    console.log("Server Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

const getConfirmar = async (req, res) => {
  const { token } = req.params;

  try {
    const emprendedorConfirmar = await Emprendedor.findOne({ token });

    if (!emprendedorConfirmar) {
      return res.status(404).json({ message: "Emprendedor not found" });
    }

    console.log("Emprendedor encontrado:", emprendedorConfirmar);

    emprendedorConfirmar.token = null;
    emprendedorConfirmar.confirmado = true;

    const updatedEmprendedor = await emprendedorConfirmar.save();
    console.log("Emprendedor actualizado:", updatedEmprendedor);

    res.json({ msg: "Emprendedor confirmado" });
  } catch (err) {
    console.log("Error al confirmar emprendedor:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const postAutenticar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emprendedor = await Emprendedor.findOne({ email });

    if (!emprendedor) {
      return res.status(404).json({ message: "Emprendedor no existe" });
    }

    const isMatch = await bcrypt.compare(password, emprendedor.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({ message: "Autenticación exitosa", emprendedor });
  } catch (err) {
    console.log("Error al autenticar emprendedor:", err);
    res.status(500).json({ error: "Server error" });
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
  getConfirmar,
  postAutenticar,
};
