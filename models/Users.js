const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    productos: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    emprendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Emprendedor",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
