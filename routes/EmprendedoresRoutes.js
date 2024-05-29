const express = require("express");

const router = express.Router();

const {
  createEmprendedor,
  getEmprendedorPerfil,
  getEmprendedors,
  updateEmprendedor,
  deleteEmprendedor,
  getConfirmar,
  postAutenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} = require("../controllers/Emprendedores");
const checkAuth = require("../middleware/authMiddleware");

//? Ruta publica
router.get("/confirmar/:token", getConfirmar);
router.get("/", getEmprendedors);
router.put("/:id", updateEmprendedor);
router.delete("/:id", deleteEmprendedor);
router.post("/", createEmprendedor);
router.post("/login", postAutenticar);
router.post("/olvide-password", olvidePassword);

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//? Ruta protegida
router.get("/perfil", checkAuth, getEmprendedorPerfil);

module.exports = router;
