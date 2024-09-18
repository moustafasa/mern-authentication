// const fsPromises = require("fs").promises;
// const path = require("path");
// const users = {
//   data: require("./users.json"),
//   setUsers: async (users) => {
//     this.data = users;
//     console.log("done");
//     await fsPromises.writeFile(
//       path.join(__dirname, "users.json"),
//       JSON.stringify(users)
//     );
//   },
// };

// module.exports = users;

const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [Number], default: [2000] },
  refreshToken: { type: String, default: "" },
});

module.exports = mongoose.model("User", UsersSchema);
