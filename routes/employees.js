const express = require("express");
const employeeController = require("../controllers/employeesController");
const verifyRole = require("../middlewares/verifyRole");
const router = express.Router();
const roles_list = require("../config/roles_list");

router
  .route("/")
  .get(verifyRole(roles_list.ADMIN), employeeController.getEmployees)
  .post(verifyRole(roles_list.ADMIN), employeeController.setEmployees)
  .put(verifyRole(roles_list.ADMIN), employeeController.updateEmployees)
  .delete(verifyRole(roles_list.ADMIN), employeeController.deleteEmployee);

router.get(
  "/:id",
  verifyRole(roles_list.ADMIN),
  employeeController.getSingleEmployee
);

module.exports = router;
