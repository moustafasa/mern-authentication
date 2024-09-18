const { data: employees, setEmployees } = require("../models/employees");
function employeesController(req, res) {
  console.log(req.user, req.roles);
  res.status(200).send(employees);
}

module.exports = employeesController;
