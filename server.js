const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');
const EmprendedoresRoutes = require('../backend/routes/EmprendedoresRoutes.js');

const app = express();

dotenv.config();
connectDB();

const origin = process.env.NODE_ENV === 'production'
  ? 'https://hechoencasa-production.up.railway.app'
  : 'http://localhost:4000';

app.use(cors({
  origin: origin,
  credentials: true,
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use('/api/emprendedores', EmprendedoresRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
