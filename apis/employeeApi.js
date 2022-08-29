const express = require("express");

const router = express.Router();

const { addEmployee, addEmployeeInfo } = require("../controllers/employeeController");

//register Employee Api
router.post("/register", addEmployee);
router.post("/addinfo", addEmployeeInfo);


module.exports = router;

