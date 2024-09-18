const verifyRole =
  (...allowedRoles) =>
  (req, res, next) => {
    const roles = req.roles;
    if (!roles) return res.sendStatus(401);
    const result = allowedRoles.find((role) => roles.includes(role));
    if (!result) return res.sendStatus(401);
    next();
  };

module.exports = verifyRole;
