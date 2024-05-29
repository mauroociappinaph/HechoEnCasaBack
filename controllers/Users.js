const User = require("../models/Users");

const createUser = async (req, res) => {
  const user = new User(req.body);
  user.emprendedor = req.emprendedor._id;

  try {
    const userGuardado = await user.save();
    res.status(201).json({ user: userGuardado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const users = await User.find().where("emprendedor").equals(req.emprendedor._id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    if (user.emprendedor.toString() !== req.emprendedor._id.toString()) {
      return res.status(403).json({ msg: "Acción no válida" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const actualizarUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const eliminarUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json({ msg: "Usuario eliminado", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUser,
  eliminarUser,
};
