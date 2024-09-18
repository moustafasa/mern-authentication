const bcryptjs = require("bcryptjs");
const { data: users, setUsers } = require("../models/users");
const { v4 } = require("uuid");
const SALT_ROUND = 10;

const registerController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("please write username and password");
  }
  const foundUser = users.find((user) => user.username === username);
  console.log(foundUser);
  if (foundUser) {
    return res.status(409).send("user is already found");
  }

  const id = v4();
  const hashedPass = await bcryptjs.hash(password, SALT_ROUND);
  setUsers([
    ...users,
    {
      id,
      username,
      password: hashedPass,
      roles: [2000],
      refreshToken: "",
    },
  ]);

  res.sendStatus(201);
};

module.exports = registerController;
