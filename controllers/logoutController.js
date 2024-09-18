const Users = require("../models/Users");

const logoutController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) return res.sendStatus(204);
  const foundUser = await Users.findOne({
    refreshToken: cookie.refreshToken,
  }).exec();

  if (!foundUser) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  await foundUser.save();
  res.clearCookie("refreshToken", { httpOnly: true });

  return res.sendStatus(204);
};

module.exports = logoutController;
