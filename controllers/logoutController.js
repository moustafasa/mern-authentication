const { data: users, setUsers } = require("../models/users");

const logoutController = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) return res.sendStatus(204);
  const foundUser = users.find(
    (user) => user.refreshToken === cookie.refreshToken
  );
  if (!foundUser) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.sendStatus(204);
  }
  const otherUsers = users.filter(
    (user) => user.username !== foundUser.username
  );
  setUsers([...otherUsers, { ...foundUser, refreshToken: "" }]);
  res.clearCookie("refreshToken", { httpOnly: true });
  return res.sendStatus(204);
};

module.exports = logoutController;
