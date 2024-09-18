const express = require("express");
const employeeController = require("../controllers/employeesController");
const verifyRole = require("../middlewares/verifyRole");
const router = express.Router();
const roles_list = require("../config/roles_list");

router.route("/").get(verifyRole(roles_list["ADMIN"]), employeeController);

module.exports = router;
