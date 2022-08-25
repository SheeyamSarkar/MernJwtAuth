const express = require("express");

const router = express.Router();

const { registerController,loginController,forgotPasswordController,resetPasswordController } = require("../controllers/authController");
const  verifyTokenController  = require("../controllers/verifyTokenController");

//register User Api
router.post("/register", registerController);
//Login Api
router.post("/login", loginController);
//ForgotPassword Api
router.post("/forgotpassword", forgotPasswordController);
//verifyToken Api
router.get("/verifyToken", verifyTokenController);
//resetPassword Api
router.post("/resetpassword", resetPasswordController);

module.exports = router;