// const { data: users, setUsers } = require("../models/Users");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

const refreshController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) return res.sendStatus(401);
  const foundUser = await Users.findOne({
    refreshToken: cookie.refreshToken,
  }).exec();
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(
    cookie.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || decoded.username !== foundUser.username) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign(
        {
          UserInfo: { username: decoded.username, roles: foundUser.roles },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      return res.status(200).json({ accessToken });
    }
  );
};

module.exports = refreshController;
