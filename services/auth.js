const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "SomeRandomSecretKey";

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    imageURL: user.imageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = {
  createToken,
  validateToken,
};
