const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
  return token;
}
function validateToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  return decoded;
}

module.exports = { createToken, validateToken };
