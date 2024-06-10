const express = require("express");

const router = express.Router();

// Importar los controladores de Emprendedores
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

// Importar el middleware de autenticación
const checkAuth = require("../middleware/authMiddleware");

/**
 * Rutas públicas de Emprendedores
 */

// GET /api/emprendedores/confirmar/:token - Obtener un token de confirmación
router.get("/confirmar/:token", getConfirmar);

// GET /api/emprendedores - Obtener todos los emprendedores
router.get("/", getEmprendedors);

// PUT /api/emprendedores/:id - Actualizar un emprendedor
router.put("/:id", updateEmprendedor);

// DELETE /api/emprendedores/:id - Eliminar un emprendedor
router.delete("/:id", deleteEmprendedor);

// POST /api/emprendedores - Crear un nuevo emprendedor
router.post("/", createEmprendedor);

// POST /api/emprendedores/login - Autenticar un emprendedor
router.post("/login", postAutenticar);

// POST /api/emprendedores/olvide-password - Recuperar contraseña emprendedor
router.post("/olvide-password", olvidePassword);

// POST /api/emprendedores/nuevo-password/:token - Crear una nueva contraseña
router.post("/nuevo-password/:token", nuevoPassword);

// Ruta para comprobar el token de recuperación de contraseña
router.route("/olvide-password/:token")
  .get(comprobarToken) // GET para comprobar el token
  .post(nuevoPassword); // POST para crear una nueva contraseña

/**
 * Rutas protegidas de Emprendedores
 */

// GET /api/emprendedores/perfil - Obtener el perfil del emprendedor autenticado
router.get("/perfil", checkAuth, getEmprendedorPerfil);

module.exports = router;
