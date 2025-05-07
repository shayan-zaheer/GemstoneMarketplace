const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { redirectIfAuthenticated } = require("../middlewares/auth");

router.route("/signup").post(redirectIfAuthenticated, authController.signUp);
router.route("/login").post(redirectIfAuthenticated, authController.login);
router.route("/logout").get(authController.logout)

module.exports = router;