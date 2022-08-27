const express = require("express");
const { verifyEmailController } = require("../controllers/emailController");

const router = express.Router();

//Veryfi Email
router.get("/verify", verifyEmailController);



module.exports = router;
