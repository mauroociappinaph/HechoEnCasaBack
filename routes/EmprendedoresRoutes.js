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

module.exports = router;
