const jwt = require("jsonwebtoken");
const Emprendedor = require("../models/Emprendedores");

const checkAuth = async (req, res, next) => {
  let token;
  const authHeader = req.headers?.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    console.log("Extracted token:", token); // Log the extracted token

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decodedToken); // Log decoded token content

      req.userId = decodedToken.id;

      req.emprendedor = await Emprendedor.findById(decodedToken.id).select(
        "-password -confirmado -products -company_address -token -__v"
      );

      return next();
    } catch (err) {
      console.error("Error verifying token:", err.message); // Log error message
      if (!token) {
        return res
          .status(403)
          .json({ msg: "Token no valido, autorización denegada" });
      }
    }
  } else {
    return res.status(401).json({ msg: "No se ha autenticado" });
  }
};

module.exports = checkAuth;
