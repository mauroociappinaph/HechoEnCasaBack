const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors");
const EmprendedoresRoutes = require("../backend/routes/EmprendedoresRoutes.js");
const UsersRoutes = require("../backend/routes/UsersRoutes.js");

const app = express();

dotenv.config();
connectDB();

const dominiosPermitidos = [
  "http://localhost:4000",
  "https://hechoencasa-production.up.railway.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true, // Add this if you need to support credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api/emprendedores", EmprendedoresRoutes);
app.use("/api/user", UsersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
