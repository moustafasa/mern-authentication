const { data: users, setUsers } = require("../models/users");
const jwt = require("jsonwebtoken");

const refreshController = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) return res.sendStatus(401);
  const foundUser = users.find(
    (user) => user.refreshToken === cookie.refreshToken
  );
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
