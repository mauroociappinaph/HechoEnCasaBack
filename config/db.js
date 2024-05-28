const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(uri);
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`Conectado a la base de datos ${url}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
