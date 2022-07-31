const jwt = require("jsonwebtoken");

const genJwtToken = (id) => {
  const payload = {
    aud: id,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: "30d" });
};

module.exports = genJwtToken;
