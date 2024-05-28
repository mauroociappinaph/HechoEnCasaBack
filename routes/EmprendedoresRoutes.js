const express = require("express");

const router = express.Router();

router.get('/', function (req, res
  ) {
  res.send('Hello World!')
})

const {
  createEmprendedor,
  getEmprendedor,
  getEmprendedors,
  updateEmprendedor,
  deleteEmprendedor,
} = require("../controllers/Emprendedores");


router.post("/", createEmprendedor);
router.get("/:id", getEmprendedor);
router.get("/", getEmprendedors);
router.put("/:id", updateEmprendedor);
router.delete("/:id", deleteEmprendedor);

module.exports = router;
