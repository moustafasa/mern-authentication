const fsPromises = require("fs").promises;
const path = require("path");
const users = {
  data: require("./users.json"),
  setUsers: async (users) => {
    this.data = users;
    console.log("done");
    await fsPromises.writeFile(
      path.join(__dirname, "users.json"),
      JSON.stringify(users)
    );
  },
};

module.exports = users;
