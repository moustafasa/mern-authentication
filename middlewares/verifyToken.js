const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization || req.headers.authorization;
  if (!header.startsWith("Bearer")) return res.sendStatus(401);
  const token = header.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = decode.UserInfo.username;
    req.roles = decode.UserInfo.roles;
    next();
  });
};

module.exports = verifyToken;
