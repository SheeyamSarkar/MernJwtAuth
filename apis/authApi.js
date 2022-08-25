const express = require("express");

const router = express.Router();

const { registerController } = require("../controllers/authController");

//register User Api
router.post("/register", registerController);

module.exports = router;