const express = require("express");
const router = express.Router();
const {
  createUser,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUser,
  eliminarUser,
} = require("../controllers/Users");
const checkAuth = require("../middleware/authMiddleware");

router.route("/").post(checkAuth, createUser).get(checkAuth, obtenerUsuarios);

router
  .route("/:id")
  .get(checkAuth, obtenerUsuario)
  .put(checkAuth, actualizarUser)
  .delete(checkAuth, eliminarUser);

module.exports = router;
