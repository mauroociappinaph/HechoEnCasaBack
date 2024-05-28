const mongoose = require("mongoose");
const generarId = require("../helpers/generarId");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  repeat_password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: "Passwords don't match",
    },
  },
  phone: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: generarId,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
