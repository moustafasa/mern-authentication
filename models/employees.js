// const fsPromises = require("fs").promises;
// const path = require("path");
// const employees = {
//   data: require("./employees.json"),
//   setEmployees: async (employees) => {
//     this.data = employees;
//     await fsPromises.writeFile(
//       path.join(__dirname, "employees.json"),
//       JSON.stringify(employees)
//     );
//   },
// };

// module.exports = employees;

const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
