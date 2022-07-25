const jwt = require("jsonwebtoken");

// import models
const { Users } = require("../models");

const secret = process.env.JWT_SECRET || "secret";

const jwtAuth = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const userId = decoded.id;

    const userData = await Users.findByPk(userId);

    if (!userData) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = userData;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  jwtAuth,
};
