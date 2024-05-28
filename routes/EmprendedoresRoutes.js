const express = require("express");

const router = express.Router();

const {
  createEmprendedor,
  getEmprendedor,
  getEmprendedors,
  updateEmprendedor,
  deleteEmprendedor,
} = require("../controllers/Emprendedores");

router.get("/:id", getEmprendedor);
router.get("/", getEmprendedors);
router.put("/:id", updateEmprendedor);
router.delete("/:id", deleteEmprendedor);
router.post("/", createEmprendedor);

module.exports = router;
