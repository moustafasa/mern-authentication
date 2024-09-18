const Employees = require("../models/Employees");
const getEmployees = async (req, res) => {
  const employees = await Employees.find({});
  res.status(200).json(employees);
};

const setEmployees = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname) return res.sendStatus(400);
  await Employees.create({ firstname, lastname });
  res.sendStatus(201);
};

const updateEmployees = async (req, res) => {
  const { id, firstname, lastname } = req.body;
  if (!id || (!firstname && !lastname)) return res.sendStatus(400);
  const foundEmployee = await Employees.findOne({ _id: id });
  if (!foundEmployee) return res.sendStatus(400);
  if (firstname) foundEmployee.firstname = firstname;
  if (lastname) foundEmployee.lastname = lastname;
  await foundEmployee.save();
  res.sendStatus(200);
};

const deleteEmployee = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(400);
  const foundEmployee = await Employees.findOne({ _id: id });
  if (!foundEmployee) return res.sendStatus(404);
  await foundEmployee.deleteOne();
  res.sendStatus(200);
};

const getSingleEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  const foundEmployee = await Employees.findOne({ _id: id });
  if (!foundEmployee) return res.sendStatus(404);
  res.json(foundEmployee);
};

module.exports = {
  getEmployees,
  setEmployees,
  updateEmployees,
  deleteEmployee,
  getSingleEmployee,
};
