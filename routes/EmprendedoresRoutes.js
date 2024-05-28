const express = require("express");

const router = express.Router();

const {
  createEmprendedor,
  getEmprendedor,
  getEmprendedors,
  updateEmprendedor,
  deleteEmprendedor,
  getConfirmar,
  postAutenticar,
} = require("../controllers/Emprendedores");

router.get("/:id", getEmprendedor);
router.get("/confirmar/:token", getConfirmar);
router.get("/", getEmprendedors);
router.put("/:id", updateEmprendedor);
router.delete("/:id", deleteEmprendedor);
router.post("/", createEmprendedor);
router.post("/login", postAutenticar);

module.exports = router;
