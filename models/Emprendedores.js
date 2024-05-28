const mongoose = require("mongoose");

const EmprendedorSchema = new mongoose.Schema({
  name: {
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
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_address: {
    type: String,
    required: true,
  },
  products: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Emprendedor = mongoose.model("Emprendedor", EmprendedorSchema);

module.exports = Emprendedor;
