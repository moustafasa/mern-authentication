const bcryptjs = require("bcryptjs");
// const { data: users, setUsers } = require("../models/Users");
const User = require("../models/Users");
const { v4 } = require("uuid");
const SALT_ROUND = 10;

const registerController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("please write username and password");
  }
  const foundUser = await User.findOne({ username }).exec();
  if (foundUser) {
    return res.status(409).send("user is already found");
  }

  const hashedPass = await bcryptjs.hash(password, SALT_ROUND);
  await User.create({
    username,
    password: hashedPass,
  });

  res.sendStatus(201);
};

module.exports = registerController;
