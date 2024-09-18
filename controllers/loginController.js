// const { data: users, setUsers } = require("../models/Users");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

async function loginController(req, res) {
  const bcryptjs = require("bcryptjs");
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("please write username and password");
  }
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.status(401).send("user isn't found");
  }

  const match = await bcryptjs.compare(password, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { UserInfo: { username, roles: foundUser.roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    return res.status(200).json({ accessToken });
  }
  res.sendStatus(401);
}

module.exports = loginController;
