const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authcontroller");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// regerter new user
router.route("/register").post(authcontroller.registeruser);
//Login user 
router.route("/login").post(authcontroller.loginuser);

module.exports = router;
