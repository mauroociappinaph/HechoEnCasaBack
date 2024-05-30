const mongoose = require("mongoose");
const generarId = require("../helpers/generarId");

const EmprendedorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  repeat_password: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  business_name: {
    type: String,
    required: true,
  },
  company_address: {
    type: String,
  },
  products: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  token: {
    type: String,
    default: generarId,
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Emprendedor = mongoose.model("Emprendedor", EmprendedorSchema);

module.exports = Emprendedor;
